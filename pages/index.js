import 'bootstrap/dist/css/bootstrap.css';
import Login from "@/components/Login";
import { useRouter } from 'next/router';
import Dashboard from "@/components/Dashboard";

export default function App() {
  const router = useRouter()
  const getCodeParam = router.query.code
  return getCodeParam ? <Dashboard code={getCodeParam} /> : <Login />
}