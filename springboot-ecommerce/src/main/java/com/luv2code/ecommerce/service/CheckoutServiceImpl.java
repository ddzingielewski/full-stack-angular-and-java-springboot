package com.luv2code.ecommerce.service;

import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;
import com.luv2code.ecommerce.entity.OrderItem;

@Service
public class CheckoutServiceImpl implements CheckoutService {

	CustomerRepository customerRepository;

	public CheckoutServiceImpl(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		if (purchase != null) {
			// retrieve the order info from dto
			Order order = purchase.getOrder();

			// generate order tracking number
			String orderTrackingNumber = generateOrderTrackingNumber();
			order.setOrderTrackingNumber(orderTrackingNumber);

			// populate order with order items
			Set<OrderItem> orderItems = purchase.getOrderItems();
			orderItems.stream().forEach(item -> order.add(item));

			// populate order with billing and shipping address
			order.setBillingAddress(purchase.getBillingAddress());
			order.setShippingAddress(purchase.getShippingAddress());

			// populate customer with order
			Customer customer = purchase.getCustomer();
			customer.add(order);

			// save to the database
			customerRepository.save(customer);

			// return a response
			PurchaseResponse response = new PurchaseResponse();
			response.setOrderTrackingNumber(orderTrackingNumber);
			return response;
		} else
			throw new RuntimeException("Invalid purchase object");
	}

	private String generateOrderTrackingNumber() {
		return UUID.randomUUID().toString();
	}

}
