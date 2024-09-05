

 
export const capitalize = (string: string) => {
    return string
    .split(/[-\s]/) // Split words on '-' and space
    .map(string => 
        string.charAt(0).toUpperCase() +
        string.slice(1).toLowerCase()
    )
    .join(' '); // Join the words with a space
}
