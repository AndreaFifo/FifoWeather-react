import { Globe } from 'react-feather';
import { useContext} from "react";
import { GlobalContext } from "../../../App";
import { italy, uk, spain } from '../../../assets';

const langs = [
    {id: 'en_US', locale: 'en_US', label: 'English', flag: uk},
    {id: 'it_IT', locale: 'it_IT', label: 'Italian', flag: italy},
    {id: 'es_ES', locale: 'es_ES', label: 'Spanish', flag: spain}
];

const LanguageMenu = () => {
    const { language, searching } = useContext(GlobalContext);

    return (
        <div className="language-part">
            <Globe size={24} className="language"/>
            
            <ul className="language-dropdown">
                {
                    langs.map(lang => 
                        <li key={lang.id} id={lang.id} onClick={(e) => {language.languageHandle(e); !searching.searching ? searching.setSearching(true) : null}} className={language.language === lang.id ? 'selected' : ''}>
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