import styled from "styled-components";

export default function FilterButton() {
  return (
    <StyledWrapper>
      <div className="glass-radio-group">
        <input type="radio" name="sort" id="sort-recent" defaultChecked />
        <label htmlFor="sort-recent">Most Recent</label>
        <input type="radio" name="sort" id="sort-oldest" />
        <label htmlFor="sort-oldest">Oldest</label>
        <div className="glass-glider" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .glass-radio-group {
    --bg: #0f172a; /* Darker background for container */
    --text: #9ca3af; /* Gray text for unselected */
    --selected-text: #ffffff;
    --glider-bg: #1e293b; /* Slightly lighter background for selected pill */
    
    display: flex;
    position: relative;
    background: var(--bg);
    padding: 3px;
    border-radius: 1.2rem; /* rounded-xl */
    border: 1px solid #1e293b;
    overflow: hidden;
    width: fit-content;
  }

  .glass-radio-group input {
    display: none;
  }

  .glass-radio-group label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 90px;
    font-size: 12px;
    padding: 0.4rem 1rem;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: var(--text);
    position: relative;
    z-index: 2;
    transition: color 0.3s ease-in-out;
  }

  .glass-radio-group label:hover {
    color: #e5e5e5;
  }

  .glass-radio-group input:checked + label {
    color: var(--selected-text);
  }

  .glass-glider {
    position: absolute;
    top: 4px;
    bottom: 4px;
    width: calc(50% - 3px);
    border-radius: 0.9rem; /* Slightly less than container for nesting */
    z-index: 1;
    background: var(--glider-bg);
    transition:
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      background 0.3s ease-in-out;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  /* Most Recent */
  #sort-recent:checked ~ .glass-glider {
    transform: translateX(0%);
  }

  /* Oldest */
  #sort-oldest:checked ~ .glass-glider {
    transform: translateX(100%);
  }
`;
