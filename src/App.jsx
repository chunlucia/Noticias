import { ThemePicker, useTheme } from "@teishi/bulma_theme";
import ArticleForm from "./components/ArticleForm";

function App() {
    const { primary, secondary } = useTheme("state");

    return (
        <div className={`box m-4 p-4 has-background-${secondary}`}>
            <ArticleForm />
        </div>
    );
}

export default App;








/*import ArticleForm form "./components/ArticleForm";

function App(){
    return(
        <div>
        <ArticleForm/>
        </div>
    );
}




export default App;*/
