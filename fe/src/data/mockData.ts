// Mock data for EdTech Adaptive Tutoring App

export interface Topic {
  id: string;
  name: string;
  subject: 'web-dev' | 'networks';
}

export interface Question {
  id: string;
  topicId: string;
  concept: string;
  question: string;
  sampleAnswer: string;
}

export interface Explanation {
  conceptBreakdown: string;
  analogy: string;
  keyTakeaway: string;
}

export interface ProgressItem {
  topicId: string;
  topicName: string;
  attempted: number;
  fixed: number;
  needsReview: number;
  progress: number;
}

export const subjects = [
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'HTML, CSS, JavaScript & React fundamentals',
  },
  {
    id: 'networks',
    name: 'Computer Networks',
    description: 'Protocols, architecture & network design',
  },
];

export const topics: Topic[] = [
  // Web Development
  { id: 'html-forms', name: 'HTML Forms', subject: 'web-dev' },
  { id: 'css-flexbox', name: 'CSS Flexbox', subject: 'web-dev' },
  { id: 'js-scope', name: 'JavaScript Scope', subject: 'web-dev' },
  { id: 'react-state', name: 'React State', subject: 'web-dev' },
  // Computer Networks
  { id: 'osi-model', name: 'OSI Model', subject: 'networks' },
  { id: 'tcp-ip', name: 'TCP/IP', subject: 'networks' },
  { id: 'dns-resolution', name: 'DNS Resolution', subject: 'networks' },
  { id: 'subnetting', name: 'Subnetting', subject: 'networks' },
];

export const questions: Question[] = [
  // Web Development Questions
  {
    id: 'q1',
    topicId: 'css-flexbox',
    concept: 'Flex Container Properties',
    question: 'What does `justify-content: space-between` do in a flex container?',
    sampleAnswer: 'It distributes items evenly with the first item at the start and the last item at the end.',
  },
  {
    id: 'q2',
    topicId: 'css-flexbox',
    concept: 'Flex Item Alignment',
    question: 'How would you center an item both horizontally and vertically using Flexbox?',
    sampleAnswer: 'Set the container to display: flex, then use justify-content: center and align-items: center.',
  },
  {
    id: 'q3',
    topicId: 'js-scope',
    concept: 'Variable Hoisting',
    question: 'What will console.log(x) output if called before `var x = 5;`?',
    sampleAnswer: 'undefined, because var declarations are hoisted but not their assignments.',
  },
  {
    id: 'q4',
    topicId: 'js-scope',
    concept: 'Closure Basics',
    question: 'Why can an inner function access variables from its outer function even after the outer function has returned?',
    sampleAnswer: 'Because of closures - the inner function maintains a reference to its lexical environment.',
  },
  {
    id: 'q5',
    topicId: 'react-state',
    concept: 'State Updates',
    question: 'Why should you never modify state directly in React (e.g., `state.count = 5`)?',
    sampleAnswer: 'Direct mutation bypasses React\'s change detection, so the component won\'t re-render.',
  },
  {
    id: 'q6',
    topicId: 'html-forms',
    concept: 'Form Validation',
    question: 'What is the difference between the `required` attribute and JavaScript validation?',
    sampleAnswer: 'The required attribute is built-in HTML validation that prevents form submission, while JS validation offers more flexibility and custom error messages.',
  },
  // Computer Networks Questions
  {
    id: 'q7',
    topicId: 'osi-model',
    concept: 'Layer Responsibilities',
    question: 'Which OSI layer is responsible for end-to-end delivery and error recovery?',
    sampleAnswer: 'The Transport Layer (Layer 4) handles end-to-end communication and error recovery.',
  },
  {
    id: 'q8',
    topicId: 'tcp-ip',
    concept: 'TCP vs UDP',
    question: 'When would you choose UDP over TCP for network communication?',
    sampleAnswer: 'When low latency is more important than reliability, like in live streaming or online gaming.',
  },
  {
    id: 'q9',
    topicId: 'dns-resolution',
    concept: 'DNS Lookup Process',
    question: 'What happens if the recursive DNS resolver doesn\'t have a cached record?',
    sampleAnswer: 'It queries root servers, then TLD servers, then authoritative servers to resolve the domain.',
  },
  {
    id: 'q10',
    topicId: 'subnetting',
    concept: 'CIDR Notation',
    question: 'How many usable host addresses are in a /26 subnet?',
    sampleAnswer: '62 usable addresses (64 total minus network and broadcast addresses).',
  },
];

export const explanations: Record<string, Explanation> = {
  'q1': {
    conceptBreakdown: '`justify-content` controls how flex items are distributed along the main axis (horizontal by default). `space-between` places the first item at the start edge and the last item at the end edge, then distributes remaining items evenly in between with equal gaps.',
    analogy: 'Imagine arranging books on a shelf where you push the first book against the left wall, the last book against the right wall, and spread the rest evenly between them.',
    keyTakeaway: 'space-between creates equal gaps between items but no gap at the container edges.',
  },
  'q3': {
    conceptBreakdown: 'JavaScript hoists `var` declarations to the top of their scope during compilation. This means the variable exists from the start of the scope, but its value is `undefined` until the assignment line executes.',
    analogy: 'It\'s like a teacher calling roll at the start of class — the student\'s name is on the list (declared), but their seat is empty (undefined) until they actually arrive (assignment).',
    keyTakeaway: 'Hoisting moves declarations up, not initializations. Use `let` and `const` to avoid confusion.',
  },
  'q5': {
    conceptBreakdown: 'React relies on detecting state changes through the setState function (or useState setter). When you mutate state directly, React\'s reference comparison sees the same object and assumes nothing changed, skipping the re-render.',
    analogy: 'It\'s like changing the furniture inside your house but keeping the same address. If someone only checks the address to see if you\'ve moved, they\'ll think nothing changed.',
    keyTakeaway: 'Always create a new state object/array when updating. Immutability is key to React\'s reactivity.',
  },
  'q7': {
    conceptBreakdown: 'The Transport Layer (Layer 4) provides process-to-process communication. TCP at this layer handles segmentation, flow control, error detection, and retransmission to ensure reliable delivery between applications.',
    analogy: 'Think of it as a registered mail service. Layer 3 (Network) gets the letter to the right building, but Layer 4 makes sure it reaches the specific person and confirms they received it.',
    keyTakeaway: 'Transport Layer = end-to-end reliability. Network Layer = device-to-device routing.',
  },
  'q9': {
    conceptBreakdown: 'DNS resolution follows a hierarchical process. The resolver first checks root servers (which know TLD servers), then queries the appropriate TLD server (like .com), which points to the authoritative nameserver that holds the actual IP mapping.',
    analogy: 'It\'s like asking for directions: first you ask which country, then which city, then which street, until you reach the exact address.',
    keyTakeaway: 'DNS is hierarchical: Root → TLD → Authoritative. Each level narrows down the search.',
  },
};

export const mockProgress: ProgressItem[] = [
  { topicId: 'css-flexbox', topicName: 'CSS Flexbox', attempted: 8, fixed: 5, needsReview: 2, progress: 75 },
  { topicId: 'js-scope', topicName: 'JavaScript Scope', attempted: 6, fixed: 4, needsReview: 1, progress: 80 },
  { topicId: 'react-state', topicName: 'React State', attempted: 4, fixed: 2, needsReview: 2, progress: 50 },
  { topicId: 'osi-model', topicName: 'OSI Model', attempted: 5, fixed: 3, needsReview: 1, progress: 70 },
  { topicId: 'tcp-ip', topicName: 'TCP/IP', attempted: 3, fixed: 1, needsReview: 2, progress: 40 },
];
