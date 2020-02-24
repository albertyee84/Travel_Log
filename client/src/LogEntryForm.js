import React from 'react'
import { useForm } from 'react-hook-form';

import { createLogEntry } from './API'

export const LogEntryForm = ({ location }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            console.log(created);
        } catch (error) {
            console.error(error);
        }
    }
    return (
      <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input name="title" required ref={register} />
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" rows={3} ref={register} />
        <label htmlFor="description">Description</label>
        <textarea name="description" rows={3} ref={register} />
        <label htmlFor="image">Image</label>
        <input name="image" ref={register} />
        <label htmlFor="visitDate">Visit Date</label>
        <input type="date" name="visitDate" required ref={register} />
        <button>Create Entry</button>
      </form>
    );
}
