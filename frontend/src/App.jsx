import {Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import TaskList from './components/TaskList';
import TaskEdit from './components/TaskEdit';
import TaskNew from "./components/TaskNew";
import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import {ChakraProvider, defaultSystem} from "@chakra-ui/react";
import ActivityCreate from "./components/activities/ActivityCreate";
import ActivityEdit from "./components/activities/ActivityEdit";
import ProjectList from "./components/projects/ProjectList";
import ProjectCreate from './components/projects/ProjectCreate';
import ProjectEdit from './components/projects/ProjectEdit';
import ProjectShow from "./components/projects/ProjectShow";

function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <Routes>
                {/* Rota da pagina inicial */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Header/>
                            <Home/>
                        </PrivateRoute>
                    }
                />
                {/* Rota da pagina de login */}
                <Route path="/login" element={<Login/>}/>
                {/* Rota da pagina de cadastro */}
                <Route path="/cadastro" element={<Cadastro/>}/>
                {/* Rota da pagina de edicao de tarefas */}
                <Route
                    path="/tasks/edit/:id"
                    element={
                        <PrivateRoute>
                            <Header/>
                            <TaskEdit/>
                        </PrivateRoute>
                    }
                />
                {/* Rota da pagina de inclusão de tarefas */}
                <Route
                    path="/tasks/new"
                    element={
                        <PrivateRoute>
                            <Header/>
                            <TaskNew/>
                        </PrivateRoute>
                    }
                />
                {/* Rota da pagina para listagem de tarefas */}
                <Route
                    path="/tasks"
                    element={
                        <PrivateRoute>
                            <Header/>
                            <TaskList/>
                        </PrivateRoute>
                    }
                />
                {/* Rota da pagina para listagem de projetos */}
                <Route
                    path="/projects"
                    element={
                        <PrivateRoute>
                            <Header/>
                            <ProjectList/>
                        </PrivateRoute>
                    }
                />

                {/* Rota da pagina para criação de projetos */}
                <Route
                    path="/projects/new"
                    element={
                        <PrivateRoute>
                            <Header/>
                            <ProjectCreate/>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/projects/:id"
                    element={
                        <PrivateRoute>
                            <Header/>
                            <ProjectShow/>
                        </PrivateRoute>
                    }
                />

                {/* Rota da pagina para edição de projetos */}
                <Route
                    path="/projects/:id/edit"
                    element={
                        <PrivateRoute>
                            <Header/>
                            <ProjectEdit/>
                        </PrivateRoute>
                    }
                />

                {/* Rota da pagina para criação de atividades dentro de um projeto */}
                <Route path="/projects/:id/activities/new" element={<ActivityCreate/>}/>

                {/* Rota da pagina para edição de atividades dentro de um projeto */}
                <Route path="/projects/:id/activities/:activityId/edit" element={<ActivityEdit/>}/>
            </Routes>
        </ChakraProvider>
    );
}

export default App;