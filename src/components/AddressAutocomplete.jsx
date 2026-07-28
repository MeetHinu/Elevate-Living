import { useEffect, useRef, useState } from "react";
import { searchAddresses } from "../lib/addressSearch.js";

const MIN_QUERY_LENGTH = 4;
const DEBOUNCE_MS = 600;

export default function AddressAutocomplete({ id, name, value, onChange, disabled, required }) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const handleInputChange = (event) => {
    onChange(event);
    const query = event.target.value;

    clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    if (query.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const results = await searchAddresses(query, { signal: controller.signal });
        setSuggestions(results);
        setOpen(results.length > 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setSuggestions([]);
          setOpen(false);
        }
      }
    }, DEBOUNCE_MS);
  };

  const handleSelect = (label) => {
    onChange({ target: { name, value: label } });
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setOpen(suggestions.length > 0)}
        disabled={disabled}
        required={required}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        autoComplete="off"
      />
      {open && (
        <ul id={`${id}-listbox`} role="listbox" className="address-suggestions">
          {suggestions.map((item) => (
            <li key={item.id} role="option" aria-selected="false">
              <button type="button" onClick={() => handleSelect(item.label)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
