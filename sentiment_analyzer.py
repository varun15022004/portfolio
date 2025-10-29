import streamlit as st
import pandas as pd
import pickle
import re
import time
import plotly.graph_objects as go
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import os
from datetime import datetime
import json

# Set page config
st.set_page_config(
    page_title="CineScore - AI Sentiment Analyzer",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Professional Dark Theme CSS
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    /* Dark theme variables */
    :root {
        --bg-primary: #0d1117;
        --bg-secondary: #161b22;
        --bg-tertiary: #21262d;
        --accent-primary: #58a6ff;
        --accent-secondary: #1f6feb;
        --success: #3fb950;
        --error: #f85149;
        --warning: #d29922;
        --text-primary: #c9d1d9;
        --text-secondary: #8b949e;
        --border: #30363d;
    }
    
    /* Main background */
    .main {
        background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    /* Content wrapper */
    .block-container {
        padding-top: 3rem;
        padding-bottom: 3rem;
        max-width: 1400px;
    }
    
    /* Headers */
    h1, h2, h3, h4, h5, h6 {
        color: var(--text-primary) !important;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
    }
    
    h1 {
        background: linear-gradient(135deg, #58a6ff 0%, #79c0ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    p, label, span, div {
        color: var(--text-primary);
    }
    
    /* Hero Section */
    .hero {
        text-align: center;
        padding: 60px 20px;
        background: linear-gradient(135deg, rgba(88, 166, 255, 0.1) 0%, rgba(31, 111, 235, 0.1) 100%);
        border-radius: 24px;
        margin-bottom: 48px;
        border: 1px solid rgba(88, 166, 255, 0.2);
        backdrop-filter: blur(10px);
    }
    
    .hero h1 {
        font-size: 72px !important;
        margin-bottom: 16px;
        font-weight: 800;
        letter-spacing: -2px;
    }
    
    .hero-subtitle {
        font-size: 28px;
        color: #58a6ff;
        font-weight: 600;
        margin: 16px 0;
    }
    
    .hero-description {
        font-size: 18px;
        color: #8b949e;
        margin-top: 12px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
    
    /* Text area styling */
    .stTextArea textarea {
        background-color: var(--bg-tertiary) !important;
        color: var(--text-primary) !important;
        border: 2px solid var(--border) !important;
        border-radius: 16px !important;
        font-size: 17px !important;
        padding: 20px !important;
        transition: all 0.3s ease !important;
        font-family: 'Inter', sans-serif !important;
        line-height: 1.6 !important;
    }
    
    .stTextArea textarea:focus {
        border-color: var(--accent-primary) !important;
        box-shadow: 0 0 0 4px rgba(88, 166, 255, 0.15) !important;
        background-color: var(--bg-secondary) !important;
    }
    
    .stTextArea textarea::placeholder {
        color: var(--text-secondary) !important;
        opacity: 0.7;
    }
    
    /* Button styling */
    .stButton > button {
        background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%) !important;
        color: white !important;
        font-weight: 600 !important;
        border: none !important;
        border-radius: 12px !important;
        padding: 16px 40px !important;
        font-size: 18px !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 24px rgba(88, 166, 255, 0.4) !important;
        font-family: 'Inter', sans-serif !important;
        text-transform: none !important;
        letter-spacing: 0.3px;
    }
    
    .stButton > button:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 8px 32px rgba(88, 166, 255, 0.6) !important;
        background: linear-gradient(135deg, #79c0ff 0%, #58a6ff 100%) !important;
    }
    
    .stButton > button:active {
        transform: translateY(-1px) !important;
    }
    
    /* Result cards */
    .result-card {
        background: var(--bg-tertiary);
        border: 2px solid var(--border);
        padding: 48px;
        border-radius: 24px;
        text-align: center;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.6s ease;
        backdrop-filter: blur(10px);
        margin: 24px 0;
    }
    
    .positive-card {
        background: linear-gradient(135deg, rgba(63, 185, 80, 0.15) 0%, rgba(46, 160, 67, 0.15) 100%);
        border: 2px solid var(--success);
        box-shadow: 0 12px 40px rgba(63, 185, 80, 0.25);
    }
    
    .negative-card {
        background: linear-gradient(135deg, rgba(248, 81, 73, 0.15) 0%, rgba(218, 54, 51, 0.15) 100%);
        border: 2px solid var(--error);
        box-shadow: 0 12px 40px rgba(248, 81, 73, 0.25);
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .sentiment-emoji {
        font-size: 100px;
        margin: 24px 0;
        filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));
    }
    
    .sentiment-text {
        font-size: 48px;
        font-weight: 800;
        margin: 20px 0;
        letter-spacing: 2px;
    }
    
    .confidence-text {
        font-size: 32px;
        opacity: 0.95;
        font-weight: 600;
    }
    
    .result-description {
        margin-top: 28px;
        font-size: 19px;
        opacity: 0.9;
        line-height: 1.6;
    }
    
    /* Info boxes */
    .info-box {
        background: rgba(88, 166, 255, 0.08);
        border: 1px solid rgba(88, 166, 255, 0.25);
        padding: 28px;
        border-radius: 16px;
        border-left: 4px solid var(--accent-primary);
        margin: 24px 0;
        backdrop-filter: blur(10px);
    }
    
    .info-box h3 {
        margin: 0 0 12px 0;
        color: var(--accent-primary) !important;
        font-size: 22px;
    }
    
    .info-box p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 16px;
        line-height: 1.5;
    }
    
    .tip-box {
        background: var(--bg-tertiary);
        border: 1px solid var(--border);
        padding: 28px;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }
    
    .tip-box h4 {
        color: var(--accent-primary) !important;
        margin: 20px 0 12px 0;
        font-size: 18px;
    }
    
    .tip-box h4:first-child {
        margin-top: 0;
    }
    
    .tip-box ul {
        color: var(--text-secondary);
        margin: 8px 0;
        padding-left: 24px;
    }
    
    .tip-box li {
        margin: 8px 0;
        line-height: 1.5;
    }
    
    /* Tabs */
    .stTabs [data-baseweb="tab-list"] {
        gap: 12px;
        background-color: var(--bg-tertiary);
        padding: 12px;
        border-radius: 16px;
        margin-bottom: 32px;
    }
    
    .stTabs [data-baseweb="tab"] {
        background-color: transparent;
        color: var(--text-secondary);
        border-radius: 10px;
        padding: 14px 28px;
        font-weight: 600;
        border: none;
        transition: all 0.3s ease;
        font-size: 16px;
    }
    
    .stTabs [aria-selected="true"] {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        color: white !important;
        box-shadow: 0 4px 16px rgba(88, 166, 255, 0.3);
    }
    
    .stTabs [data-baseweb="tab"]:hover {
        background-color: rgba(88, 166, 255, 0.12);
        color: var(--accent-primary);
    }
    
    /* Metrics */
    [data-testid="stMetricValue"] {
        font-size: 36px;
        color: var(--accent-primary) !important;
        font-weight: 700;
    }
    
    [data-testid="stMetricLabel"] {
        color: var(--text-secondary) !important;
        font-size: 15px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    [data-testid="stMetricDelta"] {
        font-size: 18px;
    }
    
    /* Expander */
    .streamlit-expanderHeader {
        background-color: var(--bg-tertiary) !important;
        border: 1px solid var(--border) !important;
        border-radius: 12px !important;
        color: var(--text-primary) !important;
        font-weight: 600 !important;
        padding: 16px 20px !important;
        font-size: 16px !important;
    }
    
    .streamlit-expanderHeader:hover {
        border-color: var(--accent-primary) !important;
        background-color: rgba(88, 166, 255, 0.08) !important;
    }
    
    .streamlit-expanderContent {
        background-color: var(--bg-tertiary) !important;
        border: 1px solid var(--border) !important;
        border-top: none !important;
        color: var(--text-primary) !important;
        padding: 20px !important;
    }
    
    /* Dataframe */
    .stDataFrame {
        background-color: var(--bg-tertiary);
        border: 1px solid var(--border);
        border-radius: 16px;
    }
    
    /* Progress bar */
    .stProgress > div > div > div > div {
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    }
    
    /* Success/Error/Warning boxes */
    .stSuccess {
        background-color: rgba(63, 185, 80, 0.12) !important;
        border: 1px solid var(--success) !important;
        color: var(--success) !important;
        border-radius: 12px !important;
        padding: 16px 20px !important;
        font-weight: 500;
    }
    
    .stError {
        background-color: rgba(248, 81, 73, 0.12) !important;
        border: 1px solid var(--error) !important;
        color: var(--error) !important;
        border-radius: 12px !important;
        padding: 16px 20px !important;
        font-weight: 500;
    }
    
    .stWarning {
        background-color: rgba(210, 153, 34, 0.12) !important;
        border: 1px solid var(--warning) !important;
        color: var(--warning) !important;
        border-radius: 12px !important;
        padding: 16px 20px !important;
        font-weight: 500;
    }
    
    .stInfo {
        background-color: rgba(88, 166, 255, 0.12) !important;
        border: 1px solid var(--accent-primary) !important;
        color: var(--accent-primary) !important;
        border-radius: 12px !important;
        padding: 16px 20px !important;
        font-weight: 500;
    }
    
    /* Caption text */
    .stCaption {
        color: var(--text-secondary) !important;
        font-size: 15px;
    }
    
    /* Spinner */
    .stSpinner > div {
        border-top-color: var(--accent-primary) !important;
    }
    
    /* Hide Streamlit elements */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Scrollbar */
    ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
        border-radius: 6px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 6px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--accent-primary);
    }
    
    /* Glow effect */
    .glow {
        animation: glow 2.5s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from {
            box-shadow: 0 0 20px rgba(88, 166, 255, 0.3);
        }
        to {
            box-shadow: 0 0 40px rgba(88, 166, 255, 0.6);
        }
    }
    
    /* Footer */
    .footer {
        text-align: center;
        padding: 48px 20px;
        color: var(--text-secondary);
        border-top: 1px solid var(--border);
        margin-top: 64px;
    }
    
    .footer p {
        margin: 8px 0;
        font-size: 15px;
    }
    
    /* Divider */
    hr {
        border: none;
        border-top: 1px solid var(--border);
        margin: 48px 0;
    }
    </style>
    """, unsafe_allow_html=True)

# Function to clean text
def clean_text(text):
    text = re.sub(r'<.*?>', '', text)
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    return text

# Function to load or train model
@st.cache_resource
def load_model():
    model_path = "sentiment_model.pkl"
    vectorizer_path = "vectorizer.pkl"
    
    if os.path.exists(model_path) and os.path.exists(vectorizer_path):
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        with open(vectorizer_path, 'rb') as f:
            vectorizer = pickle.load(f)
        return model, vectorizer
    else:
        st.info("🤖 Training model for the first time... Please wait.")
        
        try:
            df = pd.read_csv(r"D:\downlods\IMDB-Dataset.csv")
        except:
            try:
                df = pd.read_csv(r"D:\downlods\archive (2)\IMDB-Dataset.csv")
            except:
                df = pd.read_csv(r"D:\downlods\archive (3)\IMDB Dataset.csv")
        
        df['review'] = df['review'].apply(clean_text)
        X = df['review']
        y = df['sentiment']
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
        X_train_vec = vectorizer.fit_transform(X_train)
        
        model = LogisticRegression(max_iter=1000)
        model.fit(X_train_vec, y_train)
        
        with open(model_path, 'wb') as f:
            pickle.dump(model, f)
        with open(vectorizer_path, 'wb') as f:
            pickle.dump(vectorizer, f)
        
        return model, vectorizer

# Function to create gauge chart (dark theme)
def create_gauge_chart(value, sentiment):
    color = "#3fb950" if sentiment == 'positive' else "#f85149"
    
    fig = go.Figure(go.Indicator(
        mode = "gauge+number",
        value = value,
        domain = {'x': [0, 1], 'y': [0, 1]},
        title = {'text': "Confidence Score", 'font': {'size': 26, 'color': '#c9d1d9', 'family': 'Inter'}},
        number = {'suffix': "%", 'font': {'size': 52, 'color': color, 'family': 'Inter'}},
        gauge = {
            'axis': {'range': [None, 100], 'tickwidth': 2, 'tickcolor': color},
            'bar': {'color': color, 'thickness': 0.8},
            'bgcolor': "#161b22",
            'borderwidth': 2,
            'bordercolor': "#30363d",
            'steps': [
                {'range': [0, 50], 'color': 'rgba(210, 153, 34, 0.2)'},
                {'range': [50, 75], 'color': 'rgba(210, 153, 34, 0.3)'},
                {'range': [75, 100], 'color': 'rgba(63, 185, 80, 0.2)'}],
            'threshold': {
                'line': {'color': color, 'width': 4},
                'thickness': 0.75,
                'value': 90
            }
        }
    ))
    
    fig.update_layout(
        height=340,
        margin=dict(l=20, r=20, t=70, b=20),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        font={'family': "Inter, sans-serif", 'color': '#c9d1d9'}
    )
    
    return fig

# Function to create probability chart (dark theme)
def create_probability_chart(prob_positive, prob_negative):
    fig = go.Figure(data=[
        go.Bar(
            x=['Positive', 'Negative'],
            y=[prob_positive * 100, prob_negative * 100],
            marker_color=['#3fb950', '#f85149'],
            text=[f'{prob_positive*100:.1f}%', f'{prob_negative*100:.1f}%'],
            textposition='auto',
            textfont=dict(size=20, color='white', family='Inter', weight='bold')
        )
    ])
    
    fig.update_layout(
        title='Sentiment Probability Distribution',
        title_font=dict(size=24, color='#c9d1d9', family='Inter', weight='bold'),
        xaxis_title='Sentiment',
        yaxis_title='Probability (%)',
        yaxis=dict(range=[0, 100], gridcolor='#30363d'),
        xaxis=dict(gridcolor='#30363d'),
        height=400,
        plot_bgcolor='#0d1117',
        paper_bgcolor='rgba(0,0,0,0)',
        font={'family': "Inter", 'color': '#c9d1d9'},
        showlegend=False,
        margin=dict(l=50, r=50, t=70, b=50)
    )
    
    return fig

# Main app
def main():
    # Hero Section
    st.markdown("""
        <div class='hero'>
            <h1>🎬 CineScore</h1>
            <div class='hero-subtitle'>AI-Powered Sentiment Analyzer</div>
            <p class='hero-description'>Analyze movie reviews instantly with advanced machine learning technology. Get accurate sentiment predictions in seconds.</p>
        </div>
    """, unsafe_allow_html=True)
    
    # Load model
    try:
        with st.spinner('🤖 Loading AI model...'):
            model, vectorizer = load_model()
    except Exception as e:
        st.error(f"❌ Error loading model: {e}")
        st.stop()
    
    # Main content area
    tab1, tab2, tab3 = st.tabs(["🔍 Analyze Review", "📊 Batch Analysis", "📚 Sample Reviews"])
    
    with tab1:
        col1, col2 = st.columns([1.6, 1])
        
        with col1:
            st.markdown("""
                <div class='info-box'>
                    <h3>✍️ Enter Your Movie Review</h3>
                    <p>Type or paste your review below to discover its sentiment</p>
                </div>
            """, unsafe_allow_html=True)
            
            user_input = st.text_area(
                "Review Input",
                height=300,
                placeholder="Example: This movie was absolutely fantastic! The cinematography was breathtaking, the storyline compelling, and the performances outstanding. I highly recommend it to everyone!",
                label_visibility="collapsed",
                key="main_review_input"
            )
            
            # Word count
            word_count = len(user_input.split())
            char_count = len(user_input)
            st.caption(f"📝 {word_count} words • {char_count} characters")
            
            st.markdown("<br>", unsafe_allow_html=True)
            
            # Centered analyze button
            col_btn1, col_btn2, col_btn3 = st.columns([1, 1.2, 1])
            with col_btn2:
                analyze_button = st.button("🔍 Analyze Sentiment", type="primary", key="analyze_main")
            
        with col2:
            st.markdown("""
                <div class='info-box'>
                    <h3>💡 Quick Tips</h3>
                </div>
            """, unsafe_allow_html=True)
            
            st.markdown("""
                <div class='tip-box'>
                    <h4>✅ Good Reviews Have:</h4>
                    <ul>
                        <li>Clear opinions and feelings</li>
                        <li>Specific details about the movie</li>
                        <li>At least 20 words for best accuracy</li>
                        <li>Natural, conversational language</li>
                    </ul>
                    
                    <h4>🤖 Our AI Analyzes:</h4>
                    <ul>
                        <li>Sentiment of individual words</li>
                        <li>Phrase patterns and context</li>
                        <li>Overall emotional tone</li>
                        <li>Linguistic markers</li>
                    </ul>
                </div>
            """, unsafe_allow_html=True)
        
        # Analysis Results
        if analyze_button:
            if user_input and len(user_input.strip()) > 0:
                with st.spinner('🤖 Analyzing sentiment...'):
                    time.sleep(0.6)
                    
                    cleaned_input = clean_text(user_input)
                    input_vec = vectorizer.transform([cleaned_input])
                    prediction = model.predict(input_vec)[0]
                    probability = model.predict_proba(input_vec)[0]
                    
                    if model.classes_[0] == 'negative':
                        prob_negative = probability[0]
                        prob_positive = probability[1]
                    else:
                        prob_negative = probability[1]
                        prob_positive = probability[0]
                    
                    confidence = max(probability) * 100
                
                st.markdown("<br><br>", unsafe_allow_html=True)
                st.markdown("## 🎯 Analysis Results")
                st.markdown("---")
                
                result_col1, result_col2 = st.columns([1, 1])
                
                with result_col1:
                    if prediction == 'positive':
                        st.markdown("""
                            <div class='result-card positive-card glow'>
                                <div class='sentiment-emoji'>🌟</div>
                                <div class='sentiment-text'>POSITIVE</div>
                                <div class='confidence-text'>Confidence: {:.1f}%</div>
                                <p class='result-description'>
                                    This review expresses a favorable and positive opinion about the movie!
                                </p>
                            </div>
                        """.format(confidence), unsafe_allow_html=True)
                    else:
                        st.markdown("""
                            <div class='result-card negative-card glow'>
                                <div class='sentiment-emoji'>💔</div>
                                <div class='sentiment-text'>NEGATIVE</div>
                                <div class='confidence-text'>Confidence: {:.1f}%</div>
                                <p class='result-description'>
                                    This review expresses an unfavorable or negative opinion about the movie.
                                </p>
                            </div>
                        """.format(confidence), unsafe_allow_html=True)
                
                with result_col2:
                    fig_gauge = create_gauge_chart(confidence, prediction)
                    st.plotly_chart(fig_gauge, use_container_width=True)
                
                st.markdown("<br>", unsafe_allow_html=True)
                fig_prob = create_probability_chart(prob_positive, prob_negative)
                st.plotly_chart(fig_prob, use_container_width=True)
                
                st.markdown("<br>", unsafe_allow_html=True)
                st.markdown("### 📊 Detailed Breakdown")
                detail_col1, detail_col2, detail_col3 = st.columns(3)
                
                with detail_col1:
                    st.metric(
                        "Positive Probability",
                        f"{prob_positive*100:.2f}%",
                        delta=f"{(prob_positive - 0.5)*100:.1f}%" if prob_positive > 0.5 else None
                    )
                
                with detail_col2:
                    st.metric(
                        "Negative Probability",
                        f"{prob_negative*100:.2f}%",
                        delta=f"{(prob_negative - 0.5)*100:.1f}%" if prob_negative > 0.5 else None
                    )
                
                with detail_col3:
                    st.metric(
                        "Review Length",
                        f"{word_count} words",
                        delta="Optimal" if word_count > 20 else "Too short"
                    )
                
            else:
                st.warning("⚠️ Please enter a movie review to analyze!")
    
    with tab2:
        st.markdown("""
            <div class='info-box'>
                <h3>📄 Batch Analysis</h3>
                <p>Analyze multiple reviews at once. Enter one review per line for bulk processing.</p>
            </div>
        """, unsafe_allow_html=True)
        
        batch_input = st.text_area(
            "Batch Reviews",
            height=350,
            placeholder="Enter multiple reviews, one per line:\n\nThis movie was amazing!\nTerrible waste of time.\nDecent film, worth watching.",
            label_visibility="collapsed"
        )
        
        st.markdown("<br>", unsafe_allow_html=True)
        
        col_batch1, col_batch2, col_batch3 = st.columns([1, 1, 1])
        with col_batch2:
            batch_button = st.button("🚀 Analyze All Reviews", type="primary", key="batch_analyze")
        
        if batch_button:
            if batch_input:
                reviews = [r.strip() for r in batch_input.split('\n') if r.strip()]
                
                if reviews:
                    results = []
                    progress_bar = st.progress(0)
                    status_text = st.empty()
                    
                    for idx, review in enumerate(reviews):
                        status_text.text(f"Analyzing review {idx + 1} of {len(reviews)}...")
                        cleaned = clean_text(review)
                        vec = vectorizer.transform([cleaned])
                        pred = model.predict(vec)[0]
                        prob = model.predict_proba(vec)[0]
                        conf = max(prob) * 100
                        
                        emoji = "✅" if pred == 'positive' else "❌"
                        results.append({
                            'Review': review[:80] + '...' if len(review) > 80 else review,
                            'Sentiment': f"{emoji} {pred.title()}",
                            'Confidence': f"{conf:.1f}%",
                            'Words': len(review.split())
                        })
                        
                        progress_bar.progress((idx + 1) / len(reviews))
                    
                    status_text.empty()
                    st.success(f"✅ Successfully analyzed {len(results)} reviews!")
                    
                    st.markdown("<br>", unsafe_allow_html=True)
                    df = pd.DataFrame(results)
                    st.dataframe(df, use_container_width=True, height=450)
                    
                    st.markdown("<br>", unsafe_allow_html=True)
                    pos_count = sum(1 for r in results if 'Positive' in r['Sentiment'])
                    neg_count = len(results) - pos_count
                    
                    sum_col1, sum_col2, sum_col3 = st.columns(3)
                    with sum_col1:
                        st.metric("Total Reviews", len(results))
                    with sum_col2:
                        st.metric("✅ Positive", pos_count, delta=f"{(pos_count/len(results)*100):.0f}%")
                    with sum_col3:
                        st.metric("❌ Negative", neg_count, delta=f"{(neg_count/len(results)*100):.0f}%")
                    
            else:
                st.warning("⚠️ Please enter reviews to analyze!")
    
    with tab3:
        st.markdown("""
            <div class='info-box'>
                <h3>🎬 Sample Movie Reviews</h3>
                <p>Try these pre-written examples to see how the analyzer works with different sentiments.</p>
            </div>
        """, unsafe_allow_html=True)
        
        samples = {
            "🌟 Highly Positive": "This movie was an absolute masterpiece! The cinematography was breathtaking, the storyline compelling and kept me on the edge of my seat. The performances were outstanding, particularly the lead actor who delivered an Oscar-worthy performance. The music score perfectly complemented every scene. This is definitely one of the best films I've seen this year. Highly recommended!",
            
            "✅ Positive": "I really enjoyed this film. The plot was interesting and well-paced, and the acting was solid throughout. There were a few slow moments, but overall it was entertaining and worth watching. Good character development and nice cinematography. Would recommend to friends.",
            
            "👍 Mixed/Neutral": "The movie had some good moments and some not so good ones. The special effects were impressive, but the story felt a bit predictable. Some characters were well-developed while others felt flat. It's an okay watch if you have time, but not a must-see.",
            
            "❌ Negative": "Quite disappointed with this film. The pacing was off, and the story didn't make much sense. The acting felt forced and the dialogue was cringe-worthy at times. Expected more given the hype. Wouldn't really recommend unless you're really bored.",
            
            "💔 Highly Negative": "This was honestly one of the worst movies I've ever seen. The plot was nonsensical, the acting was terrible, and it felt like a complete waste of time and money. The special effects looked cheap, the dialogue was painful to listen to, and there was zero character development. Save yourself the agony and skip this disaster of a film.",
            
            "🎭 Classic Review": "A timeless classic that still holds up today. The direction is impeccable, and you can see why this film won so many awards. The performances are nuanced and powerful. Every frame is carefully crafted. This is cinema at its finest - a must-watch for any film enthusiast."
        }
        
        cols = st.columns(2)
        for idx, (title, sample) in enumerate(samples.items()):
            with cols[idx % 2]:
                with st.expander(title, expanded=False):
                    st.write(sample)
                    st.markdown("<br>", unsafe_allow_html=True)
                    if st.button(f"Analyze This Review", key=f"sample_{idx}"):
                        st.session_state.sample_review = sample
                        st.rerun()
        
        if 'sample_review' in st.session_state:
            st.markdown("---")
            st.markdown("<br>", unsafe_allow_html=True)
            st.markdown("### 🔍 Sample Analysis Results")
            
            sample_text = st.session_state.sample_review
            st.text_area("Selected Review", sample_text, height=150, disabled=True)
            
            cleaned = clean_text(sample_text)
            vec = vectorizer.transform([cleaned])
            pred = model.predict(vec)[0]
            prob = model.predict_proba(vec)[0]
            
            if model.classes_[0] == 'negative':
                prob_negative = prob[0]
                prob_positive = prob[1]
            else:
                prob_negative = prob[1]
                prob_positive = prob[0]
            
            conf = max(prob) * 100
            
            st.markdown("<br>", unsafe_allow_html=True)
            res_col1, res_col2 = st.columns(2)
            with res_col1:
                if pred == 'positive':
                    st.success(f"✅ **Positive Sentiment** — {conf:.1f}% confidence")
                else:
                    st.error(f"❌ **Negative Sentiment** — {conf:.1f}% confidence")
            
            with res_col2:
                st.info(f"📊 Positive: {prob_positive*100:.1f}% | Negative: {prob_negative*100:.1f}%")
            
            st.markdown("<br>", unsafe_allow_html=True)
            if st.button("🔄 Try Another Sample", key="try_another"):
                del st.session_state.sample_review
                st.rerun()

    # Footer
    st.markdown("""
        <div class='footer'>
            <p style='font-size: 16px; font-weight: 600;'>🎬 CineScore - AI Sentiment Analyzer</p>
            <p>Powered by Machine Learning • Trained on 50,000 IMDB Reviews</p>
            <p>Built with Streamlit • scikit-learn • Plotly • TF-IDF Vectorization</p>
            <p style='opacity: 0.7; margin-top: 16px;'>© 2025 CineScore. All rights reserved.</p>
        </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
