import { Button } from "../atoms/button";
import CodeInput from "../molecules/CodeInput";

const RecieveTab: React.FC = () => {
    return (
        <div className="space-y-4">
            <CodeInput onChange={() => {}} />
            <div className="text-center text-sm">
                <Button className="cursor-pointer transition-all ease-in-out w-40">recieve</Button>
            </div>
        </div>
    )
}
export default RecieveTab;