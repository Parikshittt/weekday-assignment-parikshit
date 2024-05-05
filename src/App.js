
import './App.css';
import FilterComponent from './Components/FilterComponent/Filter';
import JobCardsComponent from './Components/JobCardsComponent/JobCardsComponent';
function App() {
  return (
    <div className="searchJobPage">
      <FilterComponent />
      <JobCardsComponent />
    </div>
  );
}

export default App;
