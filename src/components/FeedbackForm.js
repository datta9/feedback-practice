import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackRating from "./FeedbackRating";
import FeedbackContext from "./context/FeedbackContext";

function FeedbackForm({ handleAdd }){
   const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

   const [rating, setRating] = useState(10);
   const [text, setText] = useState('');
   const [btnDisabled, setBtnDisabled] = useState(true);
   const [message, setMessage] = useState('');

   useEffect(() => {
      if(feedbackEdit.edit === true){
         setText(feedbackEdit.item.text)
         setBtnDisabled(false)
         setRating(feedbackEdit.item.rating)
         setMessage('')
      }
   }, [feedbackEdit])

   const handleFeedbackState = (event) => {
      const { value } = event.target

      if(value === ''){
         setBtnDisabled(true);
         setMessage(null);
      } else if((value !== '') && (value.trim().length < 10) ){
         setMessage('Text must be at least 10 characters')
         setBtnDisabled(true);
      } else {
         setBtnDisabled(false);
         setMessage(null)
      }

      setText(value)
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      if(text.trim().length >= 10){
         const newFeedback = {
            text,
            rating
         }

         if(feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedback)
         } else {
            addFeedback(newFeedback);
         }
         setText('');
         setBtnDisabled(true);
      }
   }

   return(
      <Card>
         <form onSubmit={handleSubmit}>
            <h2>How would you rate our service?</h2>
            <FeedbackRating select={(rating) => setRating(rating)} />
            <div className="input-group">
               <input type="text" placeholder="Write a review" onChange={handleFeedbackState} value={text} />
               <Button type="submit" isDisabled={btnDisabled} >Send</Button>
            </div>
            { message && <div className="message">{message}</div> }
         </form>
      </Card>
   )
}

export default FeedbackForm