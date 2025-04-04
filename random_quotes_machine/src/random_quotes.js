import React, { useState, useEffect } from 'react';
import './random_quotes_style.css';
import $ from 'jquery';

const RandomQuoteMachine = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const getQuote = () => {
    $.ajax({
      url: 'https://api.quotable.io/random',
      //https://github.com/lukePeavey/quotable
      success: function (data) {
        setQuote(data.content);
        setAuthor(data.author);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error('Error fetching quote:', textStatus, errorThrown);
        // Handle error appropriately, e.g., set an error state
      }
    });
  };

  const tweetQuote = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(url, '_blank');
  };

  const tumblrQuote = () => {
    const url = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
      author
    )}&content=${encodeURIComponent(quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    // Load the first quote when the component mounts
    getQuote(); 
    
    $('#new-quote').on('click', getQuote); 

    // Event listeners for Tweet and Tumblr were removed.
    return () => {
      $('#new-quote').off('click', getQuote);
    };
  }, []);

  return (
    <div id="wrapper">
      <div id="quote-box">
        <div className="quote-text">
          
          <span id="text">{quote}</span>
        </div>

        <div className="quote-author">
          - <span id="author">{author}</span>
        </div>
        <div className="buttons">
          <a
            className="button"
            id="tweet-quote"
            title="X it!"
            target="_blank"
            onClick={tweetQuote}
          >
            <i className="fa fa-X">
              X
            </i>
          </a>
          <a
            className="button"
            id="tumblr-quote"
            title="Tumblr it!"
            target="_blank"
            onClick={tumblrQuote}
          >
            <i className="fa fa-tumblr">
              T
            </i>
          </a>
          <div className='new-quote-button'>
          <button className="button" id="new-quote">
            New quote
          </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default RandomQuoteMachine;