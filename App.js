import { StatusBar } from 'expo-status-bar';
import Main from './src/Main/Index';

export default function App() {
  return (
    <>
      <Main />
      <StatusBar style="auto" />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
