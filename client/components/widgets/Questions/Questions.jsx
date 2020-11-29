import React, {useEffect} from "react";
import Answers from './Answers.jsx';
import { useParams, useLocation } from 'react-router-dom';
import $ from 'jquery';
import 'core-js';
import 'regenerator-runtime';



const Questions = (props) => {
  const { productId } = useParams();
  {console.log('productId:', productId)}
  const location = useLocation();
  {console.log('location:', location)}

  useEffect(async () => {
    console.log('hit')
    await props.getQuestions(productId)
    .catch((err) => {
      console.log('Error getting initial questions', err)
    })
  }, [])
  
  {console.log('props.questions:', props.questions)}
  {console.log('props.answerBoolean:', props.answerBoolean)}
  {console.log('props.id:', props.id)}

  /////////////////This is where I am submitting Question form and sending it to API//////////////////

  $('#question_form').on('submit', function( event ) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let params = { body: document.getElementById("body").value, 
                  name: document.getElementById("name").value, 
                  email: document.getElementById("email").value, 
                  product_id: Number(document.getElementById("product_id").value) 
                  }
    console.log(params);
    return props.addQuestions(params)
    .then(() => {
      window.location.href = location.pathname
      document.getElementById("body").value = ''; 
      document.getElementById("name").value = '';
      document.getElementById("email").value = '';
    })
    .catch((err) => {
      console.log('Error submitting', err)
    })
  });
  
  /////////////////This is where I am submitting Answer form and sending it to API//////////////////

  $('#answer_form').on('submit', function( event ) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let param = Number(document.getElementById("productId").value)
    let bodyParams = {body: document.getElementById("answer").value, 
                      name: document.getElementById("nickname").value, 
                      email: document.getElementById("address").value, 
                      }
    console.log(param, bodyParams);
    return props.addAnswers(param, bodyParams)
    .then(() => {
      window.location.href = location.pathname
      document.getElementById("answer").value = ''; 
      document.getElementById("nickname").value = '';
      document.getElementById("address").value = '';
      document.getElementById("productId").value = '';
    })
    .catch((err) => {
      console.log('Error submitting', err)
    })
  });
  
  
  //////// This is where we are customizing the error message.../////////
  $(function(){
    $("input[name=body]")[0].oninvalid = function () {
        this.setCustomValidity("You must enter the following:");
    }
  });
  $(function(){
    $("input[name=body]")[0].oninput = function () {
        this.setCustomValidity("");
    }
  });
  $(function(){
    $("input[name=name]")[0].oninvalid = function () {
        this.setCustomValidity("You must enter the following:");
    };
  });
  $(function(){
    $("input[name=name]")[0].oninput= function () {
        this.setCustomValidity("");
    };
  });
  $(function(){
    $("input[name=email]")[0].oninvalid = function () {
        this.setCustomValidity("You must enter the following:");
    };
  });
  $(function(){
    $("input[name=email]")[0].oninput= function () {
        this.setCustomValidity("");
    };
  });
  $(function(){
    $("input[name=answer]")[0].oninvalid = function () {
        this.setCustomValidity("You must enter the following:");
    }
  });
  $(function(){
    $("input[name=answer]")[0].oninput = function () {
        this.setCustomValidity("");
    }
  });
  $(function(){
    $("input[name=nickname]")[0].oninvalid = function () {
        this.setCustomValidity("You must enter the following:");
    };
  });
  $(function(){
    $("input[name=nickname]")[0].oninput= function () {
        this.setCustomValidity("");
    };
  });
  $(function(){
    $("input[name=address]")[0].oninvalid = function () {
        this.setCustomValidity("You must enter the following:");
    };
  });
  $(function(){
    $("input[name=address]")[0].oninput= function () {
        this.setCustomValidity("");
    };
  });

  /////Setting the about Product and questionId for add answer
  function getId(questionId, body, name){
    $("#productId").val(questionId)
    $("#aboutAnswer").text(`About the ${name}: ${body}`)
  };
  
  function getName(name){
    $("#aboutQuestion").text(`About the ${name}`)
  };



  /////Deciding how many questions will be posted////
  

  let questions;
  if (!props.filterQs) {
    questions = props.questions.slice(0, props.numRender);
  } else {
    questions = props.filterQs;
  }
  
  
  return(
    <div className="quest-wrap">
      <div className="row">
        <div>
          <h3>QUESTIONS &amp; ANSWERS</h3>
        </div>
        <div>
          <div class="search">
            <input type="text" class="searchTerm" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={(e) => props.inputSearch(e.target.value, props.questions)}></input>
            <button type="submit" class="searchButton">
              <i class="fas fa-search"></i> 
            </button>
          </div>
        </div>
      </div>
    <div className="row">
        {questions.map((question) => (
          <div>
            <div className="question_column_one">
              <div><span>Q: {question.question_body}</span></div>
              <Answers question={question} answerBoolean={props.answerBoolean} moreAnswers={props.moreAnswers} answerHelpful={(answerId) => props.answerHelpful(answerId, props.votedAnswer, props.id)} reportAnswer={(answerId) => props.reportAnswer(answerId, props.reportedAnswer, props.id)} reportedAnswer={props.reportedAnswer}/>
            </div>
              <div className="question_column_two">
                  <div>Helpful? <span className="btn_words" onClick={() => props.questionHelpful(question.question_id, props.votedAlready, props.id)}>Yes</span> ({question.question_helpfulness}) | <span><a href="#openModal-answers" className="btn_words" onClick={() => getId(question.question_id, question.question_body, props.productName)}>Add Answer</a></span></div>
              </div>
          </div>
                ))}
          <div className="row">
            <div className="question_column_one">
                {(() => {
                  if (questions.length < props.questions.length) {
                  return (<div><span><button onClick={() => props.moreQuestions(props.numRender + 2, props.questions)}>MORE ANSWERED QUESTION</button></span></div>)
                } else {
                  return null;
                }
              })()}
              <span><a href="#openModal-questions" onClick={() => getName(props.productName)}>ADD A QUESTION  +</a></span>
              <div id="openModal-questions" class="modalDialog">
                <div>
                  <a href="#close" title="Close" class="close">X</a>
                  <h2>Ask Your Question</h2>
                  <h3 id="aboutQuestion"></h3>
                    <form id="question_form">
                      <label for="body">* Your Question:</label><br />
                      <input type="text" maxlength="1000" id="body" name='body' size="100" required></input><br />
                      <label for="name">* What is your nickname</label><br />
                      <input type="text" maxlength="60" id="name" name='name' size="60" placeholder="Example: jackson11!" required></input>
                      <p>For privacy reasons, do not use your full name or email address</p>
                      <label for="email">* Your email</label><br />
                      <input type="email" maxlength="60" id="email" name='email' size="60" placeholder="Why did you like the product or not?" required></input>
                      <p>For authentication reasons, you will not be emailed</p>
                      <input type="number" id="product_id" value={props.id} style={{display: 'none'}}></input>
                      <input type="submit" value="Submit question" onsubmit="return false"></input>
                    </form>
                </div>
              </div>
              <div id="openModal-answers" class="modalDialog">
              <div>
                <a href="#exit" title="Close" class="close">X</a>
                <h2>Submit your Answer</h2>
                <h3 id="aboutAnswer"></h3>
                  <form id="answer_form">
                    <label for="answer">* Your Answer:</label><br />
                    <input type="text" maxlength="1000" id="answer" name='answer' size="100" required></input><br />
                    <label for="nickname">* What is your nickname</label><br />
                    <input type="text" maxlength="60" id="nickname" name='nickname' size="60" placeholder="Example: jack543!" required></input>
                    <p>For privacy reasons, do not use your full name or email address</p>
                    <label for="address">* Your email</label><br />
                    <input type="email" maxlength="60" id="address" name='address' size="60" placeholder="Example: jack@email.com" required></input>
                    <p>For authentication reasons, you will not be emailed</p>
                    <input type="file" id="fileToUpload" name='fileToUpload' muliple></input>
                    <input type="number" id="productId" style={{display: 'none'}}></input>
                    <input type="submit" value="Submit question" onsubmit="return false"></input>
                  </form>
              </div>
            </div>
            </div>
          </div>
    </div>
  </div>
  );
}

export default Questions;



// pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"

  // let defaultAnswers = (answers) => {
  //   console.log('default:', answers)
  //   return Object.values(answers).slice(0, 1);
  // }

  // let getAllAnswers = (answers) => {
  //   console.log('here:', answers)
  //   return Object.values(answers);
  // }

  // let questions = props.data.results;