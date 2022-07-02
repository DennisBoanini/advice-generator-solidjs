import type { Component } from 'solid-js';
import styles from './App.module.css';
import { createEffect, createSignal } from "solid-js";

interface AdviceResponse {
    slip: {id: number, advice: string}
}

const App: Component = () => {
    const [advice, setAdvice] = createSignal('');
    const [adviceNumber, setAdviceNumber] = createSignal(0);

    createEffect(() => {
        doGetAdvice()
    }, [])

    const doGetAdvice = () => {
        fetch('https://api.adviceslip.com/advice')
            .then(response => response.json())
            .then((data: AdviceResponse) => {
                setAdviceNumber(data.slip.id);
                setAdvice(data.slip.advice);
            });
    }

    const getAdvice = () => {
        doGetAdvice();
    }

    return (
        <div class={styles.App}>
            <section class={styles.adviceContainer}>
                <p class={styles.adviceNumber}>advice # {adviceNumber}</p>
                <p class={styles.adviceText}>
                    {advice}
                </p>
                <div class={styles.separator}></div>
                <button class={styles.adviceGenerator} onClick={getAdvice}/>
            </section>
        </div>
    );
};

export default App;
