import { useAuth } from '@/contexts/AuthContent';
import React, { useRef } from 'react'

function ticket() {

    const { createPost } = useAuth();
    const messageRef = useRef(null); 

    const handleCreatePost = async () => {
        const message = messageRef.current.value;

        try {
          await createPost({
            message,
          });
        } catch (error) {
            console.log(error.message + "this is the error")
        }
      };
  return (
        <div className="container">
            <div className="row">
                <h1>Submit a ticket!</h1>
                <textarea ref={messageRef}></textarea>
                <button onClick={handleCreatePost}>Submit</button>
            </div>
        </div>
    )
}

export default ticket