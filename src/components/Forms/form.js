
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const ContactForm = () => 
{
  return (
    <form>
      <TextField label="Full Name" />
      <TextField label="Email"/>
      <TextField label="Message"/>
      <Button type="submit">Submit</Button>
    </form>
  )
}