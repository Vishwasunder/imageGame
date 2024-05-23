import './index.css'

const Tabs = props => {
  const {details, activeTabId, onTabChange} = props
  const {tabId, displayText} = details

  const onTabSelect = () => {
    onTabChange(tabId)
  }

  return (
    <li className={activeTabId === tabId ? 'li' : 'tab'}>
      <button
        className={`btnTab ${activeTabId === tabId ? 'li' : 'tab'}`}
        onClick={onTabSelect}
      >
        {displayText}
      </button>
    </li>
  )
}
export default Tabs
