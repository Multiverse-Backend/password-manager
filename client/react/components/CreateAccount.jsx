import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import apiUrl from "../api";
import { Button, Form, Modal } from "react-bootstrap";

function CreateAccount({ setNewAccountData, newAccountData, submitNewAccount, newAccountFormView, setNewAccountFormView }) {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [show, setShow] = useState(false);

        // Handle Changes to New Account Form
        useEffect(() => {
            if (user) {
                setNewAccountData(prevData => ({
                    ...prevData,
                    email: user.email,
                }))
            }
        }, [user, setNewAccountData]);

        function handleNewAccountChange(e) {
            const { name, value } = e.target;
            setNewAccountData(prevData => ({
                ...prevData,
                [name]: value,
            }))
        }

        // Handle Form Submit
        function handleNewAccountSubmit(e) {
            e.preventDefault();
            console.log(newAccountData);
            submitNewAccount(newAccountData);
            handleClose();
        }

        // Toggle New Account Form View
        function toggleNewAccountFormView() {
            setNewAccountFormView(!newAccountFormView);
            {newAccountFormView ? setShow(false) : setShow(true)}
        }
    
        // Close Modal and Reset Form State
        function handleClose(){
            setShow(false);
            setNewAccountFormView(false);
        }


    return (
        <>
        <button id="create-account" className="btn btn-dark" onClick={toggleNewAccountFormView}>Create Account</button>

        {newAccountFormView && (
            <>
            <Modal show={show} onHide={handleClose} size="md" centered id="create-account-modal">
            <Modal.Header><h4>Create Account</h4></Modal.Header>
            <Modal.Body>
                <div id="new-account-form">
                        <div id="left">
                            <Form.Label>Account Name</Form.Label><br/>
                                <input type="text" name="account_name" onChange={handleNewAccountChange} /><br/><br/>
                            <Form.Label>Email</Form.Label><br/>
                                <input type="email" name="email" value={user.email} onChange={handleNewAccountChange} /><br/>
                        </div>
                            
                            <div id="right">
                                <Form.Label>Username</Form.Label><br/>
                                    <input type="text" name="username" onChange={handleNewAccountChange} /><br/><br/>
                                <Form.Label>Password</Form.Label><br/>
                                    <input type="password" name="password"  onChange={handleNewAccountChange} /><br/>
                            </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">Cancel</Button>
                    <Button id="submit-account" type="submit" variant="dark-outline" onClick={handleNewAccountSubmit}>Submit</Button>    
            </Modal.Footer>
            </Modal>
            </>
        )}
        </>
    )
}

export default CreateAccount;