import { useState } from "react";
import { Button } from "../atoms/button";
import CodeInput from "../molecules/CodeInput";

interface RecieveTabProps {
    onRecieve: (code: string) => void;
}

const RecieveTab: React.FC<RecieveTabProps> = ({onRecieve}) => {
    const [code, setCode] = useState<string>("");
    return (
        <div className="space-y-4">
            <CodeInput onChange={(value) => setCode(value)} />
            <div className="text-center text-sm">
                <Button onClick={() => onRecieve(code)} className="cursor-pointer transition-all ease-in-out w-40">recieve</Button>
            </div>
        </div>
    )
}
export default RecieveTab;