class Ability
  include CanCan::Ability

  def initialize(user)
    alias_action :create, :read, :update, :destroy, to: :crud

    if user.driver?
      cannot :crud, Order

      can :index, Order
    elsif user.dispatcher?
      can %i[index create], Order
      can %i[update show destroy], Order, author_id: user.id
    end

    cannot :all, Order unless user.verified?
  end
end
