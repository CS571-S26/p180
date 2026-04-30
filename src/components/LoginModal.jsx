import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function LoginModal({ show, onHide, onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const finalName = name.trim() || 'Student'
    const finalEmail = email.trim() || 'student@wisc.edu'

    onLogin({
      name: finalName,
      email: finalEmail
    })

    setName('')
    setEmail('')
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log In to RoomRadar</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="login-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
            />
          </Form.Group>

          <Form.Group controlId="login-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="dark" type="submit">
            Log In
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}