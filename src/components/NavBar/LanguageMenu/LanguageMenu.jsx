import { Globe } from 'react-feather';
import { useContext} from "react";
import { GlobalContext } from "../../../App";
import { italy, uk, spain } from '../../../assets';
import { languages } from '../../../utils/dictionary';

const langs = [
    {id: 'en', locale: 'en-US', flag: uk},
    {id: 'it', locale: 'it-IT', flag: italy},
    {id: 'sp', locale: 'es-ES', flag: spain}
];

const LanguageMenu = () => {
    const { language } = useContext(GlobalContext);

    return (
        <div className="language-part">
            <Globe size={24} className="language"/>
            
            <ul className="language-dropdown">
                {
                    langs.map((lang, i) => 
                        <li key={lang.id} id={lang.id} locale={lang.locale}
                            onClick={(e) => {language.languageHandle(e)}} 
                            className={language.language.id === lang.id ? 'selected' : ''}
                        >
                            <img src={lang.flag} alt={lang.label} />
                            <p>{languages[language.language.id].lang_[i]}</p>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default LanguageMenu