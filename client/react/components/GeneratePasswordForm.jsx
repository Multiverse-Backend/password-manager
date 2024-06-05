import React from 'react';
import bullets from '../../assets/lock-bullet.png';


function GeneratePasswordForm({ setLength, length, generatePassword, generatedPassword, handleButtonClick }) {
    return (
        <>
        <div id="form-container">
            <input id='password-length' type="number" placeholder="Enter Length" onChange={(e) => setLength(e.target.value)} /><br/>
            <button id="submit" className="btn btn-outline-light" onClick={() => generatePassword(length)}>Submit</button><br/>
        </div>

        {/* If Generated Password is NOT null, display the result */}
        {generatedPassword !== null &&
            <>
                <div id="password-display" style={{display: 'block'}}>
                    <h5>Your Password:</h5>
                    <p id='output'>{generatedPassword}</p>
                </div>
            </>
        }                                
        
        {length < 8 && (
            <p style={{color: 'red'}}>Minimum Length is 8</p>
        )}

<hr/><br/>
        <h5>Secure Password Standards</h5><br/>
        <div id='standards'>
            <div id='overview'>
                <p>It's important to create a secure password to protect your accounts. Here are some recommended standards to prevent unauthorized access</p>
            </div>

            <div id='standards-list'>
            <ul>
                <li style={{backgroundImage: `url(${bullets})`}}>At least 8 characters</li>
                <li style={{backgroundImage: `url(${bullets})`}}>At least one uppercase letter</li>
                <li style={{backgroundImage: `url(${bullets})`}}>At least one lowercase letter</li>
                <li style={{backgroundImage: `url(${bullets})`}}>At least one number</li>
                <li style={{backgroundImage: `url(${bullets})`}}>At least one special character</li>
            </ul>
            </div>
        </div><br/>
        <button id="back" className="btn btn-light" onClick={() => handleButtonClick()}>Go Back</button>   
    </>
    )
}

export default GeneratePasswordForm;