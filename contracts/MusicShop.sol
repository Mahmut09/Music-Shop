// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MusicShop {
    struct Album {
        uint index;
        string uid;
        string title;
        uint price;
        uint quantity;
    }

    struct Order {
        uint orderId;
        string albumUid;
        address customer;
        uint orderAt;
        OrderStatus status;
    }

    enum OrderStatus { Paid, Delivered }

    Album[] public albums;
    Order[] public orders;

    uint public currentIndex;
    uint public currentOrderId;

    address public owner;

    event AlbumBought(string indexed uid, string rawUid, address indexed customer, uint timestamp);

    event OrderDelivered(string indexed albumUid, address indexed customer);

    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner");
        _;
    }

    function addAlbuym(string calldata uid, string calldata title, uint price, uint quantity) external onlyOwner {
        albums.push(Album({
            index: currentIndex,
            uid: uid,
            title: title,
            price: price,
            quantity: quantity
        }));

        currentIndex++;
    }

    function buy(uint _index) external payable {
        Album storage albumToBuy = albums[_index];
        require(msg.value == albumToBuy.price, "invalid price");
        require(albumToBuy.quantity > 0, "out of stock!");
        
        albumToBuy.quantity--;

        orders.push(Order({
            orderId: currentOrderId,
            albumUid: albumToBuy.uid,
            customer: msg.sender,
            orderAt: block.timestamp,
            status: OrderStatus.Paid
        }));

        currentOrderId++;

        emit AlbumBought(albumToBuy.uid, albumToBuy.uid, msg.sender, block.timestamp);
    }

    function delivered(uint _index) external onlyOwner {
        Order storage currentOrder = orders[_index];

        require(currentOrder.status != OrderStatus.Delivered, "Invalid status");

        currentOrder.status = OrderStatus.Delivered;

        emit OrderDelivered(currentOrder.albumUid, currentOrder.customer);
    }


    function allAlbums() external view returns(Album[] memory) {
        Album[] memory albumsList = new Album[](albums.length);

        for(uint i = 0; i < albums.length; i++) {
            albumsList[i] = albums[i];
        }

        return albumsList;
    }

    constructor() {
        owner = msg.sender;
    }
}