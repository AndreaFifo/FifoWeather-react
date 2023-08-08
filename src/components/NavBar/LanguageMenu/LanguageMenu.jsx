import { Globe } from 'react-feather';
import { useContext} from "react";
import { GlobalContext } from "../../../App";
import { italy, uk, spain } from '../../../assets';

const langs = [
    {id: 'en', locale: 'en-US', label: 'English', flag: uk},
    {id: 'it', locale: 'it-IT', label: 'Italian', flag: italy},
    {id: 'es', locale: 'es-ES', label: 'Spanish', flag: spain}
];

const LanguageMenu = () => {
    const { language } = useContext(GlobalContext);

    return (
        <div className="language-part">
            <Globe size={24} className="language"/>
            
            <ul className="language-dropdown">
                {
                    langs.map(lang => 
                        <li key={lang.id} id={lang.id} locale={lang.locale}
                            onClick={(e) => {language.languageHandle(e)}} 
                            className={language.language.id === lang.id ? 'selected' : ''}
                        >
                            <img src={lang.flag} alt={lang.label} />
                            <p>{lang.label}</p>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default LanguageMenu