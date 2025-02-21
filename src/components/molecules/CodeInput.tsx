import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/atoms/input-otp"

interface CodeInputProps {
    onChange: (value: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ onChange }) => {
    const [value, setValue] = React.useState("")
 
  return (
    <div className="space-y-4">
      <InputOTP
        value={value}
        maxLength={6}
        onChange={(value: string) => {setValue(value), onChange(value)}}
      >
        <InputOTPGroup>
          <InputOTPSlot className='h-12' index={0} />
          <InputOTPSlot className='h-12' index={1} />
          <InputOTPSlot className='h-12' index={2} />
          <InputOTPSlot className='h-12' index={3} />
          <InputOTPSlot className='h-12' index={4} />
          <InputOTPSlot className='h-12' index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
};

export default CodeInput;