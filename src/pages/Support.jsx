import React, { useState, useEffect } from 'react';

import faqData from '../data/faqs.json'

const Support = () => {
    const [faqs, setFaqs] = useState([]);
    const [showAnswer, setShowAnswer] = useState('0-0');

    useEffect(() => {
        setFaqs(faqData.faqs);
    },[])

    const handleShowAnswer = (index) => {
        setShowAnswer(prevIndex => (prevIndex === index ? null : index));
    }

    return (
        <div id='support_page'>
            <div className='header-part'>
                <h1>HOW CAN WE HELP YOU?</h1>
            </div>
            <div className='list-of-tabs'>
                <div className='item'>
                    <span className='icon'>
                        <i class="bi bi-file-earmark-text"></i>
                    </span>
                    <h4>User Manuals</h4>
                </div>
                <div className='item'>
                    <span className='icon'>
                        <i class="bi bi-envelope"></i>
                    </span>
                    <h4>Email Us</h4>
                </div>
                <div className='item'>
                    <span className='icon'>
                        <i class="bi bi-patch-question"></i>
                    </span>
                    <h4>How To</h4>
                </div>
            </div>
            <div className='faqs'>
                <div className='title'>
                    <h4>Frequently Asked Questions</h4>
                    <p>Here are the questions that are mostly asked about the system.</p>
                </div>

                {faqs.map((category, index) => (
                    <div key={index} className="faq-category">
                        <h3 className='category-name'>{category.category}</h3>
                        {category.questions.map((q, idx) => (
                            <div key={idx} className="faq-item" onClick={() => handleShowAnswer(`${index}-${idx}`)}>
                                <h4>{q.question} <span className='icon'><i className={`bi bi-${showAnswer === `${index}-${idx}` ? 'chevron-up active-faq' : 'chevron-down'}`}></i></span></h4>
                                {showAnswer === `${index}-${idx}` && <p>{q.answer}</p>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Support