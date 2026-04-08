import { Button, Form, InputGroup } from 'react-bootstrap'

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search study spaces...'
}) {
  function handleSubmit(event) {
    event.preventDefault()
    if (onSearch) {
      onSearch()
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="rr-searchbar">
      <InputGroup>
        <Form.Control
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
        <Button variant="dark" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
  )
}