
import { HeaderComponent, FooterComponent } from "../../../components/common";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useUserContext } from '../../../userContext';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context'; 

function Poll() {
  const { registeredUserData } = useUserContext();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const candidates = [
    'HEALTHCARE',
    'TRANSPORTATION',
    'DRINKING_WATER',
    'ROAD',
    'EDUCATION',
    'CRIMES',
    'DOMESTIC_VIOLENCE_AND_CHILD_ABUSE'
  ];

  useEffect(() => {
    if (!auth.loggedInUser) {
      setIsAuthenticated(false);
    } else {
      fetchVotes();
    }
  }, [auth]);

  const fetchVotes = async () => {
    try {
      const response = await axios.get('https://complaint-register-server-3.onrender.com/poll/votes');
      const data = response.data;
      const newVotes = candidates.map(candidate => data[candidate] || 0);
      setVotes(newVotes);
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  const vote = async (candidateIndex:any) => {
    const candidateName = candidates[candidateIndex];
    try {
      await axios.post(`https://complaint-register-server-3.onrender.com/poll/vote/${candidateName}`);
      fetchVotes();
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const getTotalVotes = () => {
    return votes.reduce((acc, cur) => acc + cur, 0);
  };

  const getColorStyle = (index:any) => {
    const totalVotes = getTotalVotes();
    const percentage = (votes[index] / totalVotes) * 100;
    let color;
    switch (index) {
      case 0:
        color = '#f87171';
        break;
      case 1:
        color = '#60a5fa';
        break;
      case 2:
        color = '#34d399';
        break;
      case 3:
        color = '#fbbf24';
        break;
      case 4:
        color = '#6b46c1';
        break;
      case 5:
        color = '#ed64a6';
        break;
      case 6:
        color = '#4caf50';
        break;
      default:
        color = '#cccccc';
    }
    return `linear-gradient(135deg, ${color} 0%, ${color} ${percentage}%, rgba(255, 255, 255, 0) ${percentage}%)`;
  };

  if (!isAuthenticated) {
    return (
      <>
        <HeaderComponent />
        <div className="flex items-center justify-center h-screen">
          <p className="text-5xl font-bold text-blue-500">Please log in first to participate and view the poll.</p>
        </div>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <HeaderComponent />
      <div className="bg-gray-200 flex flex-col items-start justify-start max-h-screen p-6">
        <div className="text-3xl">{registeredUserData?.address}</div>
        <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-4xl mt-4 self-center">
          <h1 className="text-3xl font-bold text-center mb-4">Polling System</h1>
          <div className="space-y-10 w-full">
            {candidates.map((candidate, index) => (
              <div className="flex items-center" key={index}>
                <div className="w-1/2">
                  {candidate}
                </div>
                <div className="w-3/6">
                  <button
                    className="text-black font-bold py-2 px-40 rounded"
                    style={{ backgroundImage: getColorStyle(index), height: '50px' }}
                    onClick={() => vote(index)}
                  >
                    {votes[index]} votes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default Poll;
