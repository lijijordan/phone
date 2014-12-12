package com.phone.bean;

import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.CloseableHttpClient;
import org.codehaus.jackson.annotate.JsonIgnore;

import com.phone.connection.ConnectionFactory;

public class User{

	
	private String id;
	private BuyStatus buyStatus;
	private String orderId;
	private UserDetail userDetail;
	

	
	private String message;
	/**
	 * 
	 */

	public User() {
		final HttpClientContext context = HttpClientContext.create();
		this.setContext(context);
		this.setClient(ConnectionFactory.getHttpClientNInstance(false));
	}
	
	public User(boolean urlRedirect) {
		final HttpClientContext context = HttpClientContext.create();
		this.setContext(context);
		this.setClient(ConnectionFactory.getHttpClientNInstance(urlRedirect));
	}
	
	private String address;
	
	private String account;
	
	private String name;
	
	private String phone;
	
	private String password;
	
	@JsonIgnore
	private HttpHeader header;
	
	
	public BuyStatus getBuyStatus() {
		return buyStatus;
	}


	public void setBuyStatus(BuyStatus buyStatus) {
		this.buyStatus = buyStatus;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@JsonIgnore
	private HttpClientContext context;
	
	@JsonIgnore
	private CloseableHttpClient client;

	public HttpClientContext getContext() {
		return context;
	}

	public void setContext(HttpClientContext context) {
		this.context = context;
	}

	public CloseableHttpClient getClient() {
		return client;
	}

	public void setClient(CloseableHttpClient client) {
		this.client = client;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}


	public HttpHeader getHeader() {
		return header;
	}

	public void setHeader(HttpHeader header) {
		this.header = header;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public String getOrderId() {
		return orderId;
	}


	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public UserDetail getUserDetail() {
		return userDetail;
	}

	public void setUserDetail(UserDetail userDetail) {
		this.userDetail = userDetail;
	}

}
