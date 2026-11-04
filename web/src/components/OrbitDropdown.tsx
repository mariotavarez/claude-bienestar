import React, {useEffect, useId, useRef, useState} from 'react';
import type {KeyboardEvent} from 'react';
import './orbit-dropdown.css';

export type OrbitOption = {value: string; label: string; color?: string};
type Props = {label: string; value: string; options: OrbitOption[]; onChange: (value: string) => void; placement?: 'top' | 'bottom'; compact?: boolean};
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');

/** Select-only combobox: focus stays on the trigger while arrows explore the list. */
export function OrbitDropdown({label, value, options, onChange, placement = 'bottom', compact = false}: Props) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef({text: '', at: 0});
  const selectedIndex = Math.max(0, options.findIndex(option => option.value === value));
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const selected = options[selectedIndex];
  const active = Math.min(activeIndex, Math.max(0, options.length - 1));

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({block: 'nearest'});
  }, [open, active, id]);

  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    search.current = {text: '', at: 0};
    trigger.current?.focus();
  }

  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!options.length) return;
    if (event.key === 'Escape') {
      if (open) { event.preventDefault(); event.stopPropagation(); setOpen(false); }
      search.current = {text: '', at: 0};
      return;
    }
    if (event.key === 'Tab') { setOpen(false); return; }
    if (event.key === 'Enter' || (event.key === ' ' && (!search.current.text || Date.now() - search.current.at >= 700))) {
      event.preventDefault();
      if (open) choose(active);
      else { setActiveIndex(selectedIndex); setOpen(true); }
      return;
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
      search.current = {text: '', at: 0};
      if (event.key === 'Home') setActiveIndex(0);
      else if (event.key === 'End') setActiveIndex(options.length - 1);
      else if (!open) setActiveIndex(selectedIndex);
      else setActiveIndex((active + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const previous = now - search.current.at < 700 ? search.current.text : '';
      const text = previous + normalize(event.key);
      search.current = {text, at: now};
      // Repeated letters cycle matching options; several letters refine the match.
      const prefix = [...text].every(letter => letter === text[0]) ? text[0] : text;
      const start = open ? active : selectedIndex;
      const candidates = Array.from({length: options.length}, (_, offset) => (start + (prefix.length === 1 ? 1 : 0) + offset) % options.length);
      const match = candidates.find(index => normalize(options[index].label).startsWith(prefix));
      setOpen(true);
      if (match !== undefined) setActiveIndex(match);
    }
  }

  return <div className={'orbit-dropdown' + (compact ? ' od-compact' : '')} data-placement={placement} ref={root} onBlur={event => {if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);}}>
    <span className="od-label" id={id + '-label'}>{label}</span>
    <button className="od-trigger" type="button" role="combobox" ref={trigger} disabled={!options.length} aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? id + '-list' : undefined} aria-labelledby={id + '-label ' + id + '-value'} aria-activedescendant={open ? `${id}-option-${active}` : undefined} onKeyDown={keyDown} onClick={() => {setActiveIndex(selectedIndex); setOpen(!open); search.current = {text: '', at: 0};}}>
      {selected?.color && <i className="od-dot" style={{background: selected.color}} aria-hidden="true"/>}<span id={id + '-value'}>{selected?.label || 'Sin opciones'}</span><svg className="od-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m5 7 5 5 5-5"/></svg>
    </button>
    {open && <div id={id + '-list'} className="od-options" role="listbox" aria-labelledby={id + '-label'}>{options.map((option, index) => <button className="od-option" key={option.value} id={`${id}-option-${index}`} type="button" role="option" tabIndex={-1} aria-selected={option.value === value} data-active={active === index} onPointerMove={event => {if (event.pointerType === 'mouse') setActiveIndex(index);}} onMouseDown={event => event.preventDefault()} onClick={() => choose(index)}>
      {option.color && <i className="od-dot" style={{background: option.color}} aria-hidden="true"/>}<span>{option.label}</span>{option.value === value && <svg className="od-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 10 4 4 8-8"/></svg>}
    </button>)}</div>}
  </div>;
}
