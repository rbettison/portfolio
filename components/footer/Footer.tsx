import GetInTouch from '../getintouch/GetInTouch';
import styles from './footer.module.css';


export default function Footer() {
    return (
    <div className="text-left flex flex-col fixed right-24">
        <p className="text-3xl hover:text-highlighttext underline mb-8">Get in touch</p>
        <p>bettison.rob1@gmail.com</p>
    </div>
    )
}