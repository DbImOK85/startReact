
var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        textAll: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 UAH!',
        textAll: 'А евро 42 UAH!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        textAll: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

window.ee = new EventEmitter();

let Add = React.createClass ({
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.testInput).focus();
    },
    getInitialState: function() {
        return {
            newsAuthorValue: '',
            buttonDisable: true,
            newsText: '',
            inputChecked: false,
            newsFullText: '...'
        }
    },
    handleInputChange: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.state.newsAuthorValue = e.target.value;
        this.setState(this.state);
    },
    handleTextareaChange: function(e) {
        e.preventDefault();
        e.stopPropagation();

        this.state.newsText = e.target.value;
        this.setState(this.state);
    },
    handleButtonClick: function(e) {
        e.stopPropagation();
        e.preventDefault();
        let newsAuthor = this.state.newsAuthorValue;
        let news = this.state.newsText;
        let newNews = {};
        newNews.author = newsAuthor;
        newNews.text = news;
        newNews.textAll = this.state.newsFullText;

        window.ee.emit('AddNews', newNews);

    },
    handleCheckruleChecked: function() {
        this.state.inputChecked ? this.state.inputChecked = false : this.state.inputChecked = true;
        if (this.state.newsAuthorValue.length && this.state.newsText && this.state.inputChecked) {
            this.state.buttonDisable = false
        } else {
            this.state.buttonDisable = true
        }
        this.setState(this.state);
    },
    render: function() {
        return (
            <div>
                <form className="add__news">
                    <input className='add__news_author'
                           value={this.state.value}
                           onChange={this.handleInputChange}
                           placeholder="Автор"
                           ref="testInput"/>
                    <textarea className='add__news_text'
                              defaultValue=''
                              placeholder='Текст новости'
                              ref='text' onChange={this.handleTextareaChange}></textarea>
                    <label className='add__news_checkrule'>
                        <input type='checkbox' defaultChecked={this.state.inputChecked} ref='checkrule' onClick={this.handleCheckruleChecked}/>Я согласен с правилами
                    </label>
                    <button className="add__news_btn" onClick={this.handleButtonClick} disabled={this.state.buttonDisable}>Добавить новость</button>
                </form>
            </div>
        )
    }
});

let Article = React.createClass ({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            textAll: React.PropTypes.string.isRequired
        })
    },

    getInitialState: function() {
        return {
            visible: true
        }
    },

    handleReadMoreClick: function(e) {
        e.preventDefault();
        this.state.visible = false;
        this.setState(this.state);
    },

    render: function() {
        let author = this.props.data.author;
        let text = this.props.data.text;
        let textAll = this.props.data.textAll;
        let visible = this.state.visible;

        return (
            <div className="news__article">
                <p className="news__author">{author}</p>
                <p className="news__text">{text}</p>
                <a href="#"
                    className={'news__readmore ' + (visible ? '' : 'none')}
                    onClick={this.handleReadMoreClick}>Подробнее</a>
                <p className={"news__text_all " + (visible ? '' : 'none')}>{textAll}</p>
            </div>
        )
    }
});

let News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
   render: function() {
       let news = this.props.data;
       let newsTemplate;
       if (news) {
           newsTemplate = news.map(function(item, i){
               return (
                   <div key={i}>
                        <Article data={item}/>
                   </div>
               )

           });
       } else {
           newsTemplate = <p className="news__empty">Новостей нет</p>
       }
       return (
           <div className="news">
           {newsTemplate}
                <strong className={news ? '' : 'none'}>Всего новостей: {news.length}</strong>
            </div>
       )
   }
});

let Comments = React.createClass({
    render: function () {
        return (
        <div className="comments">
            Новостей нет, комментировать нечего!
        </div>
        )
    }
})


let App = React.createClass({
    getInitialState: function() {
        return{
            news: my_news
        }
    },
    componentDidMount: function() {
        let self = this;
        window.ee.addListener('AddNews', function(newNews) {
            self.state.news.push(newNews);
            self.setState(self.state);
        })
    },
    componentWillUnmount: function() {
        window.ee.removeListener('AddNews');
    },
    render: function () {
        return (
            <div className="app">
                <h3>Новости</h3>
                <Add />
                <News data={my_news}/>
                <Comments />
            </div>
        )
    }
});



ReactDOM.render(
    <App />,
    document.getElementById('root')
);
