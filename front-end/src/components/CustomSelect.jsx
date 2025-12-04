import { useState } from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({ label, options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <StyledWrapper>
            <div
                className="select"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div className="selected">
                    <span>{value || label}</span>
                    <ChevronDown
                        className={`arrow ${isOpen ? "rotated" : ""}`}
                        size={16}
                    />
                </div>
                <div className={`options ${isOpen ? "open" : ""}`}>
                    <div
                        className={`option ${value === "" ? "active" : ""}`}
                        onClick={() => handleSelect("")}
                    >
                        {label}
                    </div>
                    {options.map((opt) => (
                        <div
                            key={opt}
                            className={`option ${value === opt ? "active" : ""}`}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </div>
                    ))}
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .select {
    width: fit-content;
    cursor: pointer;
    position: relative;
    color: white;
    font-family: inherit;
  }

  .selected {
    background-color: #1e293b;
    padding: 0.75rem 1.25rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-width: 140px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
  }

  .selected:hover {
    background-color: #334155;
    border-color: #475569;
  }

  .arrow {
    transition: transform 0.3s ease;
    color: #94a3b8;
  }

  .arrow.rotated {
    transform: rotate(180deg);
  }

  .options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #1e293b;
    border-radius: 1rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .options.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .option {
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    transition: all 0.2s ease;
    font-size: 14px;
    color: #cbd5e1;
    font-weight: 500;
  }

  .option:hover {
    background-color: #334155;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    color: white;
  }

  .option.active {
    //  chnage this color for the active option
    background-color: #0f172a;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    color: white;
  }
`;
