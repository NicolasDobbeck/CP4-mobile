//Componentes do TanQuery
import { QueryClient, QueryClientProvider as TanstackProvider } from "@tanstack/react-query";

//Cia um instacia do QueryClient (controlar error, loading, etc)
const queryClient = new QueryClient()

//Um componente que irá envolver a minha aplicação
//Que vai permitir que componente filho acesso o TanQuery
export default function QueryClientProvider({children}){
    return(
        <TanstackProvider client={queryClient}>
            {children}
        </TanstackProvider>
    )
}