'use client'
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
	borderRadius: "0.375rem", // disable the border radius
	w: "11.5625rem",
	h: "2.25rem",
	bgColor: "#FFFFFF",
	boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 25%)",
	alignItems: 'center',
	alignContent: 'center',
	p: "0.55rem",
	textAlign: 'center',
	justifyContent: "center",
	zIndex: 1,
	fontWeight: 'normal',
})

export const BadgeStyle = defineStyleConfig({
	baseStyle,
})
