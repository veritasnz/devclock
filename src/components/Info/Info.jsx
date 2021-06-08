import s from "./Info.module.css";
import portrait from "./dp-170x170.jpg";

const Info = () => {
    return (
        <div className={s.infowrap}>
            <h2>How to use this app</h2>
            <p>
                This is a{" "}
                <a
                    href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    pomodoro-style
                    <i
                        className="fas fa-external-link-alt"
                        aria-hidden="true"
                    ></i>
                </a>{" "}
                productivity app that automatically manages time cycles that you
                can customise yourself.
                <br />
                Create your custom cyclical stopwatch by adding and removing
                time-blocks in the 'Cycle' portion of the Settings (
                <i className="fas fa-cog" aria-hidden="true"></i>) menu.
                <br />
                Interact with the timer by using the Start/Stop buttons. <br />
                Once started, the timer will automatically tick, and a
                computer-generated voice will alert you at the end of each time
                block as of what to do next. <br />
                The amount of times you have completed the cycle is represented
                by the 'round' counter above the timer display. This number can
                be reset back to one in the settings.
            </p>
            <h2>Features of this app</h2>
            <ul>
                <li>Saving of settings between visits</li>
                <li>Customisable Cycles</li>
                <li>Customisable announcer</li>
                <li>Dark Mode</li>
                <li>Responsive design</li>
            </ul>
            <h2>Why &amp; how it was made</h2>
            <p>
                As a dev I found myself staring at the screen for way too long,
                without resting my eyes or drinking enough water. So I wanted to
                design a cyclical stopwatch app that would automatically tell me
                when to look away from the screen (i.e. when using the{" "}
                <a
                    href="https://www.medicalnewstoday.com/articles/321536"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    20/20/20
                    <i
                        className="fas fa-external-link-alt"
                        aria-hidden="true"
                    ></i>
                </a>{" "}
                rule), when to take longer breaks, and when to get back to work
            </p>
            <p>
                This is the first React App I have made, and at the time of
                making it I was halfway through completing my React course on
                Udemy, and wanted a task to re-enforce what I was learning.{" "}
                <br />
            </p>
            <p>It is made with the following tools:</p>
            <ul>
                <li>
                    React
                    <ul>
                        <li>100% function-based components</li>
                        <li>React Hooks</li>
                        <li>Custom React Hooks</li>
                        <li>React Redux (Redux Toolkit /w Slices)</li>
                        <li>CSS Modules</li>
                    </ul>
                </li>
                <li>The localStorage API to store settings between visits</li>
                <li>
                    The built-in browser{" "}
                    <a
                        href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        SpeechSynthesis
                        <i
                            className="fas fa-external-link-alt"
                            aria-hidden="true"
                        ></i>
                    </a>{" "}
                    API
                </li>
                <li>
                    <a
                        href="https://fontawesome.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        FontAwesome
                        <i
                            className="fas fa-external-link-alt"
                            aria-hidden="true"
                        ></i>
                    </a>{" "}
                    for icons
                </li>
            </ul>

            <h2>The author – Sean Verity</h2>
            <div className={s.intro}>
                <img src={portrait} alt="Portrait of Sean Verity" />
                <div>
                    <p>
                        Web developer &amp; translator, living in Himeji, Japan.{" "}
                        <br />
                        In charge of development at my agency,{" "}
                        <a
                            href="https://kuragedigital.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Kurage Digital JP
                            <i
                                className="fas fa-external-link-alt"
                                aria-hidden="true"
                            ></i>
                        </a>
                        <br />
                        Full time dingus, drinker of tap water (among other
                        skills)
                    </p>
                </div>
            </div>
            <p className={s.sns}>
                <a
                    href="https://github.com/veritasnz/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="sr-only">Github page</span>
                    <i className="fab fa-github" aria-hidden="true"></i>
                </a>
                <a
                    href="https://linkedin.com/in/sean-verity"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="sr-only">LinkedIn page</span>
                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                </a>
                <a
                    href="https://twitter.com/veritas_nz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="sr-only">LinkedIn page</span>
                    <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
            </p>

            <h2>App To-do list</h2>
            <h3>Necessary</h3>
            <ul>
                <li>Android testing &amp; bugfixes</li>
                <li>
                    Various refactoring &amp; performance improvements – there
                    are large component-tree re-renders on each stopwatch tick
                </li>
                <li>
                    Accessibility
                    <ul>
                        <li>Move keyboard focus to modal on open</li>
                        <li>
                            Moving of keyboard focus to the modals when they
                            open
                        </li>
                    </ul>
                </li>
                <li>
                    Unit tests – with so many <i>setTimeout</i> and{" "}
                    <i>setInterval</i> calls, I've encountered a few
                    hard-to-track bugs along the way
                </li>
            </ul>
            <h3>Features</h3>
            <ul>
                <li>
                    Store current cycle position periodically and then load on
                    page load. This will stop accidental tab closing and
                    refreshing from destroying your current cycle progress
                </li>
                <li>
                    Customisable block-type names and their corresponding voice
                    messages
                </li>
            </ul>
        </div>
    );
};

export default Info;
