import { useState } from 'react'

export default function useToggler(defaultExpanded = false) {
    const [expanded, setExpanded] = useState(defaultExpanded)
    const toggleExpanded = () => setExpanded(!expanded)

    return { expanded, setExpanded, toggleExpanded}
}