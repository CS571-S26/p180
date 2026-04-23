import { Button, Form } from 'react-bootstrap'

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search spaces...',
}) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <Form className="rr-searchbar" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      <Button type="submit" variant="primary">
        Search
      </Button>
    </Form>
  )
}