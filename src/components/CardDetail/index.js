import React from 'react'
import {connect} from 'react-redux'

import './style.css'
import {closeCardPopup as closeCardPopupAction} from "../../actions/cardPopup";
import {saveCard} from "../../actions/columns";
import PropTypes from "prop-types";

class CardDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = Object.assign({
            'title': 'Новая задача',
            'id': 'card-' + (new Date().getTime()),
            'text': '',
        }, props.card);

        this.titleRef = React.createRef();
        this.changeCardTitle = this.changeCardTitle.bind(this);
        this.changeCardText = this.changeCardText.bind(this);
    }

    static contextTypes = {
        store: PropTypes.object
    };

    componentDidMount(prevProps, prevState) {
        // autofocus on title in new item
        if (!this.props.card.id)
            this.titleRef.current.focus()
    }

    changeCardTitle = event => {
        this.setState({'title': event.target.value});
    };

    textareaAutoHeight = el => {
        el.style.cssText = 'height:auto;';
        let textareaHeight = el.scrollHeight;
        el.style.cssText = 'height:' + textareaHeight + 'px';
    };

    changeCardText = event => {
        this.textareaAutoHeight(event.target);

        this.setState({
            'text': event.target.value,
        });
    };

    saveCard = (e) => {
        console.log('this.context.store.get', this.context.store.get);
        e.preventDefault();
        this.props.saveCardToStore(this.state);
        this.props.closeCardPopup();
    };

    render() {
        const {closeCardPopup} = this.props;

        return (
            <div className="popup-wrapper">
                <div onClick={closeCardPopup}
                     className="popup-shadow"></div>
                <form onSubmit={e => this.saveCard(e, this.context.store.cardPopup)} className="card-detail">
                    <button onClick={closeCardPopup}
                            type="button"
                            className="close card-detail__close"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <header className="card-detail__header">
                        <input
                            required="required"
                            placeholder="Название задачи"
                            ref={this.titleRef}
                            type="text"
                            onChange={this.changeCardTitle}
                            className="card-detail__title-input"
                            value={this.state.title}/>
                    </header>
                    <textarea
                        onChange={this.changeCardText}
                        placeholder="Описание задачи"
                        className="card-detail__textarea"
                        value={this.state.text}> </textarea>

                    <footer className="card-detail__footer">
                        <button
                            className="btn btn-primary mr-2"
                            type='submit'>
                            Сохранить
                        </button>
                    </footer>
                </form>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        columnIndex: store.cardPopup.columnIndex,
        cardIndex: store.cardPopup.cardIndex
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeCardPopup: () => {closeCardPopupAction()},
        saveCardToStore: (card, columnIndex, cardIndex) => {
            dispatch(
                saveCard({
                    card,
                    columnIndex,
                    cardIndex
                })
            )
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail);
