import React from "react";
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';

const Questions = (props) => {
  return(
    <div className="row">
      <div>
        <h3>QUESTIONS &amp; ANSWERS</h3>
      </div>
      <div>
        <div class="search">
          <input type="text" class="searchTerm" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
          <button type="submit" class="searchButton">
            <i class="fas fa-search"></i> 
          </button>
        </div>
      </div>
        <div>
          <div className="question_column_one">
            <span><div><span>Q: {props.data}</span></div>
            <div><span>A:</span><span className="indiv_answers">This is a filler answer that we will also map over the props and return the exact repsonse.</span></div>
            <div><span>by (User), (Date)</span> | Helpful? <span className="btn_words">Yes</ span>(Count) | <span className="btn_words">Report</span></div>
            <div><span>Any additional comments that will be associated with the below pictures</span></div>
            <div><span><img src="http://placecorgi.com/100" /></span><span><img src="http://placecorgi.com/100" /></span><span><img src="http://placecorgi.com/100" /></span></div>
            <div><span>by (User), (Date)</ span> | Helpful?<button className="btn_words">Yes</button>(Count)  | <span className="btn_words">Report</span></div>
            <div><button className="btn_words">LOAD MORE ANSWERS</button></div>
            <div><span><button>MORE ANSWERED QUESTION</button></span><span><button>ADD A QUESTION  +</button></span></div></span>
          </div>
          <div className="question_column_two">
              <div>Helpful? <span className="btn_words">Yes</span> (count) | <span className="btn_words">Add Answer</span></div>
          </div>
        </div>
    </div>
  )
}

export default Questions;