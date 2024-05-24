import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import { updateUsername } from './userSlice';

export function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (!username) return;

    dispatch(updateUsername(username));
    navigate('/menu');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center">
      <p className="mb-4 text-xl font-normal text-stone-800 md:text-2xl">
        🍕 Welcome! Please start by telling us your name:
      </p>

      <Input
        placeholder="Your full name"
        value={username}
        onChange={e => setUsername(e.target.value.trim())}
      />

      {username !== '' && <Button>Start ordering</Button>}
    </form>
  );
}
