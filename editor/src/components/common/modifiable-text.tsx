import { FC, FormEvent, useEffect, useRef, useState } from "react"
import { Button, Form, FormControl } from "react-bootstrap";

interface ModifiableTextProps {
  text: string;
  onSubmitHook: (text: string) => void;
}

const ModifiableText: FC<ModifiableTextProps> = ({ text, onSubmitHook }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmitHook(currentText);
    setIsEditing(false);
  }

  const handleClick = () => {
    setIsEditing(true);
  }

  useEffect(() => { inputRef.current && inputRef.current.focus() });

  return (
    <div className="d-flex">
      {
        isEditing ?
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl ref={inputRef} type="text" size="sm" value={currentText} onChange={(event) => setCurrentText(event.target.value)} />
            <Button variant="success" type="submit" size="sm">Submit</Button>
          </Form>
        :
          <div>
            {text}
            <Button variant="light" size="sm" onClick={handleClick}>Edit</Button>
          </div>
      }
    </div>
  )
}

export default ModifiableText;
