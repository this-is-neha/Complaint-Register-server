
const Poll = require('./poll.dto');

const submitVote = async (req, res) => {
  const candidateName = req.params.candidateName; 
  try {
    let poll = await Poll.findOne();
    if (!poll) {
      poll = new Poll();
    }
 
    poll[candidateName]++;
    await poll.save(); 

    const votes = {
      [candidateName]: poll[candidateName] 
    };

    res.status(200).json(votes); 
  } catch (error) {
    console.error('Error submitting vote:', error);
    res.status(500).json({ error: 'Error submitting vote' });
  }
};








const getVotes = async (req, res) => {
    try {
      let poll = await Poll.findOne(); 
  
      if (!poll) {
        poll = new Poll(); 
        await poll.save(); 
      }
  
   
      const votes = {
        HEALTHCARE: poll.HEALTHCARE,
        TRANSPORTATION: poll.TRANSPORTATION,
        DRINKING_WATER: poll.DRINKING_WATER,
        ROAD: poll.ROAD,
        EDUCATION: poll.EDUCATION,
        CRIMES: poll.CRIMES,
        DOMESTIC_VIOLENCE_AND_CHILD_ABUSE: poll.DOMESTIC_VIOLENCE_AND_CHILD_ABUSE
      };
  
      res.status(200).json(votes);
      console.log('Votes fetched successfully:', votes); 
    } catch (error) {
      console.error('Error fetching votes:', error);
      res.status(500).json({ error: 'Error fetching votes' });
    }
  };





  
module.exports = { submitVote, getVotes };



