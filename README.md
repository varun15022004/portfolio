# 🎬 CineScore - IMDB Movie Sentiment Analysis

A stunning, professional-grade AI-powered sentiment analyzer for movie reviews built with Streamlit and Machine Learning. Features a modern dark theme UI and achieves ~87% accuracy on IMDB reviews.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Streamlit](https://img.shields.io/badge/Streamlit-1.50+-red.svg)
![ML](https://img.shields.io/badge/ML-scikit--learn-orange.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Sentiment Analysis** - Instantly analyze movie reviews as positive or negative
- **Batch Processing** - Analyze multiple reviews simultaneously with progress tracking
- **Interactive Visualizations** - Beautiful Plotly charts including gauge meters and probability distributions
- **Sample Reviews** - Pre-loaded examples to test the analyzer
- **High Accuracy** - ~87% accuracy on test data using TF-IDF + Logistic Regression

### 🎨 Professional UI/UX
- **Modern Dark Theme** - GitHub-inspired dark interface with smooth animations
- **Responsive Design** - Works seamlessly on different screen sizes
- **Animated Results** - Glowing cards with slide-in animations
- **Interactive Charts** - Confidence gauges and probability bars
- **Clean Layout** - No clutter, focused on analysis

## 🚀 Quick Start

### Prerequisites
```bash
Python 3.8 or higher
pip (Python package manager)
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/varun15022004/imdb-movie-sentiment-analysis.git
cd imdb-movie-sentiment-analysis
```

2. **Install required packages**
```bash
pip install -r requirements.txt
```

3. **Download the IMDB Dataset**
   - Download from [Kaggle IMDB Dataset](https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews)
   - Place `IMDB-Dataset.csv` in the project directory or update the path in `sentiment_analyzer.py`

4. **Run the application**
```bash
streamlit run sentiment_analyzer.py
```

The app will automatically open in your browser at `http://localhost:8501`

## 📊 How It Works

### Machine Learning Pipeline

1. **Data Preprocessing**
   - HTML tag removal
   - Text normalization (lowercase conversion)
   - Special character cleaning
   - Whitespace normalization

2. **Feature Extraction**
   - **TF-IDF Vectorization** (Term Frequency-Inverse Document Frequency)
   - 5000 maximum features
   - 1-2 gram range for phrase patterns

3. **Model Training**
   - **Algorithm**: Logistic Regression
   - **Training Data**: 40,000 IMDB reviews
   - **Test Data**: 10,000 IMDB reviews
   - **Max Iterations**: 1000
   - **Accuracy**: ~87%

4. **Prediction**
   - Real-time sentiment classification
   - Confidence score calculation
   - Probability distribution for both sentiments

## 🎯 Usage

### Single Review Analysis
1. Navigate to the **"🔍 Analyze Review"** tab
2. Enter or paste a movie review in the text area
3. Click **"🔍 Analyze Sentiment"**
4. View results with:
   - Sentiment classification (Positive/Negative)
   - Confidence score
   - Interactive gauge chart
   - Probability distribution
   - Detailed metrics

### Batch Analysis
1. Go to **"📊 Batch Analysis"** tab
2. Enter multiple reviews (one per line)
3. Click **"🚀 Analyze All Reviews"**
4. View results in an interactive table with summary statistics

### Sample Reviews
1. Visit **"📚 Sample Reviews"** tab
2. Expand any sample review category
3. Click **"Analyze This Review"** to see instant results

## 📁 Project Structure

```
imdb-movie-sentiment-analysis/
│
├── sentiment_analyzer.py      # Main Streamlit application
├── requirements.txt           # Python dependencies
├── README.md                 # Project documentation
├── .gitignore               # Git ignore file
│
├── sentiment_model.pkl      # Trained ML model (auto-generated)
└── vectorizer.pkl          # TF-IDF vectorizer (auto-generated)
```

## 🛠️ Technologies Used

### Backend & ML
- **Python 3.8+** - Programming language
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **NumPy** - Numerical computing

### Frontend & Visualization
- **Streamlit** - Web framework
- **Plotly** - Interactive charts
- **HTML/CSS** - Custom styling

### NLP & Text Processing
- **TF-IDF Vectorization** - Feature extraction
- **Logistic Regression** - Classification algorithm

## 📈 Model Performance

| Metric | Score |
|--------|-------|
| Accuracy | ~87% |
| Training Samples | 40,000 |
| Test Samples | 10,000 |
| Features | 5,000 (TF-IDF) |
| N-gram Range | 1-2 |

## 🎨 UI Highlights

### Dark Theme Design
- **Color Palette**:
  - Primary: `#58a6ff` (Blue)
  - Success: `#3fb950` (Green)
  - Error: `#f85149` (Red)
  - Background: `#0d1117` (Dark)
  - Text: `#c9d1d9` (Light Gray)

### Interactive Elements
- Animated result cards with glow effects
- Hover transitions on buttons
- Progress bars for batch processing
- Responsive gauge charts
- Interactive expandable sections

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **IMDB Dataset** - 50,000 movie reviews from Kaggle
- **Streamlit** - Amazing framework for ML web apps
- **scikit-learn** - Robust machine learning library
- **Plotly** - Beautiful interactive visualizations

## 📧 Contact

**Varun** - [@varun15022004](https://github.com/varun15022004)

Project Link: [https://github.com/varun15022004/imdb-movie-sentiment-analysis](https://github.com/varun15022004/imdb-movie-sentiment-analysis)

---

<div align="center">
  
### ⭐ Star this repository if you found it helpful!

**Made with ❤️ using Python, Streamlit & Machine Learning**

</div>
