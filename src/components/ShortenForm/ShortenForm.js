import React from 'react'

export default function ShortenForm() {
    return (
        <div>
            <form>
                <input type="url" name="url" required></input>
                <input type="submit" value="get Shorten"></input>
            </form>
        </div>
    )
}
