class Api::V1::BaseController < ActionController::API
  before_action :authenticate_api_v1_user!
  before_action :check_if_unverified

  respond_to :json

  def current_user
    current_api_v1_user
  end

  def check_if_unverified
    return render json: { verify_phone_number: 'Необходимо подтвердить номер телефона.' }, status: 401 unless current_user.verified?
  end

  def respond_with(*resources, &block)
    if self.class.mimes_for_respond_to.empty?
      raise 'In order to use respond_with, first you need to declare the ' \
        'formats your controller responds to in the class level.'
    end

    resources << { location: nil }

    mimes = collect_mimes_from_class_level
    collector = ActionController::MimeResponds::Collector.new(mimes, request.variant)
    block.call(collector) if block_given?

    if format = collector.negotiate_format(request)
      _process_format(format)
      options = resources.size == 1 ? {} : resources.extract_options!
      options = options.clone
      options[:default_response] = collector.response
      (options.delete(:responder) || self.class.responder).call(self, resources, options)
    else
      raise ActionController::UnknownFormat
    end
  end  
end
