import { Button, Form } from 'react-bootstrap'

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search spaces...',
  label = 'Search study spaces',
  controlId = 'study-space-search'
}) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <Form className="rr-searchbar" onSubmit={handleSubmit} role="search">
      <Form.Group controlId={controlId} className="rr-searchbar-input-group">
        <Form.Label className="visually-hidden">{label}</Form.Label>
        <Form.Control
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={label}
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Search
      </Button>
    </Form>
  )
}